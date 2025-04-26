import { promises as fs } from 'fs'
import path from 'path'
import { databasePath, backupsDirectory } from '../config'

async function createBackup() {
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const backupFileName = `backup-${timestamp}.db`
	const backupPath = path.join(backupsDirectory, backupFileName)

	await fs.copyFile(databasePath, backupPath)
	return backupPath
}

async function listBackups() {
	const files = await fs.readdir(backupsDirectory)
	return files.filter((file) => file.endsWith('.db'))
}

async function restoreBackup(backupFileName: string) {
	const backupPath = path.join(backupsDirectory, backupFileName)
	await fs.copyFile(backupPath, databasePath)
}

async function deleteBackup(backupFileName: string) {
	const backupPath = path.join(backupsDirectory, backupFileName)
	await fs.unlink(backupPath)
}

export { createBackup, listBackups, restoreBackup, deleteBackup }
