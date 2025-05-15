import { promises as fs } from 'fs'
import AdmZip from 'adm-zip'
import path from 'path'

import { logger } from '@main/core/logger'
import { paths } from '@main/core/paths'
import {
	getProfileDatabasePath,
	getBackupPath,
	getBackupTempExtractPath,
} from '@main/utils/path'
import { getSettings, setSettings } from '../settings'

const MS_IN_A_DAY = 86400 * 1000

async function maybeAutoBackup(): Promise<void> {
	try {
		const settings = await getSettings()
		if (!settings.backups.auto) return

		const lastBackup = settings.backups.last
		const now = Date.now()
		const interval = (settings.backups.interval ?? 7) * MS_IN_A_DAY

		if (!lastBackup || now - new Date(lastBackup).getTime() > interval) {
			logger.info('[BACKUP] Auto backup triggered.')
			await createBackup()
		}
	} catch (error) {
		logger.error('[BACKUP ERROR] Auto backup failed:', error)
	}
}

async function createBackup(): Promise<string> {
	const now = new Date()
	const timestamp = now.toISOString().replace(/[:.]/g, '-')
	const fileName = `backup-${timestamp}.zip`
	const backupPath = getBackupPath(fileName)

	try {
		logger.info('[BACKUP] Starting backup creation...')
		const zip = new AdmZip()
		zip.addLocalFolder(paths.directories.profiles, 'profiles')
		zip.writeZip(backupPath)

		logger.info(`[BACKUP] Backup created successfully at: ${backupPath}`)

		await updateLastBackupDate(now)
		await cleanupOldBackups()

		return backupPath
	} catch (error) {
		logger.error('[BACKUP ERROR] Failed to create backup:', error)
		throw error
	}
}

async function updateLastBackupDate(date: Date = new Date()): Promise<void> {
	try {
		const settings = await getSettings()
		settings.backups.last = date.toISOString()
		await setSettings(settings)
	} catch (error) {
		logger.error('[BACKUP ERROR] Failed to update last backup date:', error)
	}
}

async function cleanupOldBackups(): Promise<void> {
	try {
		const settings = await getSettings()
		const maxBackups = settings.backups.max ?? 10

		const files = await fs.readdir(paths.directories.backups)
		const zipFiles = files.filter((f) => f.endsWith('.zip'))
		const fileStats = await Promise.all(
			zipFiles.map(async (f) => ({
				file: path.join(paths.directories.backups, f),
				mtime: (
					await fs.stat(path.join(paths.directories.backups, f))
				).mtime.getTime(),
			})),
		)

		fileStats.sort((a, b) => a.mtime - b.mtime)

		while (fileStats.length > maxBackups) {
			const { file } = fileStats.shift()!
			await fs.unlink(file)
			logger.info(`[BACKUP] Deleted old backup: ${path.basename(file)}`)
		}
	} catch (error) {
		logger.error('[BACKUP ERROR] Cleanup failed:', error)
	}
}

async function listBackups(): Promise<string[]> {
	try {
		const files = await fs.readdir(paths.directories.backups)
		return files.filter((f) => f.endsWith('.zip'))
	} catch (error) {
		logger.error('[BACKUP ERROR] Listing failed:', error)
		return []
	}
}

async function restoreBackup(
	zipFileName: string,
	profileName: string,
): Promise<void> {
	const zipPath = getBackupPath(zipFileName)
	const tempPath = getBackupTempExtractPath()

	try {
		await fs.rm(tempPath, { recursive: true, force: true })
		await fs.mkdir(tempPath, { recursive: true })

		const zip = new AdmZip(zipPath)
		zip.extractAllTo(tempPath, true)

		const dbSource = path.join(tempPath, 'profiles', profileName, 'database.db')
		const dbTarget = getProfileDatabasePath(profileName)

		try {
			await fs.access(dbSource)
		} catch (error) {
			logger.error(
				`[BACKUP ERROR] Database file not found in the backup: ${dbSource}`,
			)
			throw new Error('Database file not found in the backup')
		}

		await fs.copyFile(dbSource, dbTarget)
		logger.info(`[BACKUP] Restored "${profileName}" from "${zipFileName}"`)
	} catch (error) {
		logger.error('[BACKUP ERROR] Restore failed:', error)
		throw error
	} finally {
		try {
			await fs.rm(tempPath, { recursive: true, force: true })
		} catch (cleanupError) {
			logger.error(
				'[BACKUP ERROR] Failed to clean up temporary extraction folder:',
				cleanupError,
			)
		}
	}
}

async function deleteBackup(fileName: string): Promise<void> {
	try {
		const fullPath = getBackupPath(
			fileName.endsWith('.zip') ? fileName : `${fileName}.zip`,
		)
		await fs.unlink(fullPath)
		logger.info(`[BACKUP] Deleted backup: ${fileName}`)
	} catch (error) {
		logger.error('[BACKUP ERROR] Delete failed:', error)
	}
}

export {
	maybeAutoBackup,
	createBackup,
	listBackups,
	restoreBackup,
	deleteBackup,
}
