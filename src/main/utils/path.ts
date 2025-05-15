import path from 'path'
import { paths } from '@main/core/paths'
import { logger } from '@main/core/logger'

const DATABASE_FILENAME = 'database.db'
const TEMP_EXTRACT_FOLDER = 'temp_extract'

function getProfilePath(profileName: string): string {
	const p = path.join(paths.directories.profiles, profileName)
	logger.debug(`[PATH] Profile path: ${p}`)
	return p
}

function getProfileDatabasePath(profileName: string): string {
	const p = path.join(getProfilePath(profileName), DATABASE_FILENAME)
	logger.debug(`[PATH] Profile DB path: ${p}`)
	return p
}

function getBackupPath(fileName: string): string {
	const p = path.join(paths.directories.backups, fileName)
	logger.debug(`[PATH] Backup path: ${p}`)
	return p
}

function getBackupTempExtractPath(): string {
	const p = path.join(paths.directories.backups, TEMP_EXTRACT_FOLDER)
	logger.debug(`[PATH] Backup temp extract path: ${p}`)
	return p
}

export {
	getProfilePath,
	getProfileDatabasePath,
	getBackupPath,
	getBackupTempExtractPath,
}
