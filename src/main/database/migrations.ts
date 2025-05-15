import type { Database as DatabaseType } from 'better-sqlite3'
import { logger } from '@main/core/logger'

export function applyMigrations(db: DatabaseType): void {
	db.exec(`
		CREATE TABLE IF NOT EXISTS books (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			totalVolumes INTEGER,
			currentVolume INTEGER,
			lastName TEXT,
			firstName TEXT,
			middleName TEXT,
			genre TEXT,
			content TEXT,
			annotation TEXT,
			year INTEGER,
			tags TEXT
		)
	`)

	logger.info(
		'[DATABASE] Migrations applied: "books" table created (if not exists)',
	)
}
