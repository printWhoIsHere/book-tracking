import Database, { Database as DatabaseType } from 'better-sqlite3'
import { promises as fs } from 'fs'
import { is } from '@electron-toolkit/utils'

import { logger } from '@main/core/logger'
import {
	ensureProfileDirectories,
	getActiveProfileName,
} from '@main/modules/profiles'
import { getProfileDatabasePath } from '@main/utils/path'
import { insertMockBooks } from '@main/database/mock'
import { applyMigrations } from '@main/database/migrations'

const dbInstances = new Map<string, DatabaseType>()
const dbPaths = new Map<string, string>()

async function getDatabase(profile?: string): Promise<DatabaseType> {
	const activeProfile = profile ?? (await getActiveProfileName())

	if (dbInstances.has(activeProfile)) {
		return dbInstances.get(activeProfile)!
	}

	await ensureProfileDirectories(activeProfile)

	const path = getProfileDatabasePath(activeProfile)
	logger.info(`[DATABASE] Path for "${activeProfile}": ${path}`)

	const db = new Database(path)
	applyMigrations(db)

	if (is.dev) insertMockBooks(db)

	dbInstances.set(activeProfile, db)
	dbPaths.set(activeProfile, path)
	return db
}

async function removeDatabase(profile: string): Promise<void> {
	await closeDatabase(profile)
	const path = getProfileDatabasePath(profile)
	await fs.rm(path, { force: true })
	logger.info(`[DATABASE] Removed for profile: ${profile}`)
}

async function closeDatabase(profile: string): Promise<void> {
	const db = dbInstances.get(profile)
	if (db) {
		db.close()
		dbInstances.delete(profile)
		dbPaths.delete(profile)
		logger.info(`[DATABASE] Closed for profile: ${profile}`)
	}
}

const database = {
	async getInstance(): Promise<DatabaseType> {
		const profile = await getActiveProfileName()
		return getDatabase(profile)
	},

	async getPath(): Promise<string> {
		const profile = await getActiveProfileName()
		if (!dbPaths.has(profile)) await getDatabase(profile)
		const path = dbPaths.get(profile)
		if (!path) throw new Error('[DATABASE] Path not initialized')
		return path
	},
}

export { database, getDatabase, removeDatabase, closeDatabase }
