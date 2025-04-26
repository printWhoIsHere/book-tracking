import Database from 'better-sqlite3'
import { is } from '@electron-toolkit/utils'
import {
	copyFileSync,
	readdirSync,
	unlinkSync,
	statSync,
	readFileSync,
	writeFileSync,
} from 'fs'
import path from 'path'

import { databasePath, settingsPath, backupsDirectory } from './config'

const db = new Database(databasePath)

function getSettings() {
	const settingsData = JSON.parse(readFileSync(settingsPath, 'utf-8'))
	return settingsData
}

function updateLastBackupTimestamp() {
	const settingsData = getSettings()
	settingsData.backups.lastBackup = new Date().toISOString()
	writeFileSync(settingsPath, JSON.stringify(settingsData, null, 2), 'utf-8')
}

function createBackup() {
	try {
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
		const backupFileName = `backup-${timestamp}.db`
		const backupFilePath = path.join(backupsDirectory, backupFileName)

		copyFileSync(databasePath, backupFilePath)
		console.log(`Backup created: ${backupFilePath}`)

		cleanOldBackups()
		updateLastBackupTimestamp()
	} catch (error) {
		console.error('Failed to create backup:', error)
	}
}

function cleanOldBackups() {
	try {
		const settingsData = getSettings()
		const maxBackups = settingsData.backups.maxBackups ?? 10

		const backups = readdirSync(backupsDirectory)
			.filter((file) => file.endsWith('.db'))
			.map((file) => ({
				name: file,
				time: statSync(path.join(backupsDirectory, file)).mtime.getTime(),
			}))
			.sort((a, b) => a.time - b.time)

		while (backups.length > maxBackups) {
			const oldest = backups.shift()
			if (oldest) {
				const filePath = path.join(backupsDirectory, oldest.name)
				unlinkSync(filePath)
				console.log(`Deleted old backup: ${filePath}`)
			}
		}
	} catch (error) {
		console.error('Failed to clean old backups:', error)
	}
}

function maybeAutoBackup() {
	try {
		const settingsData = getSettings()

		if (!settingsData.backups.autoBackup) return

		const lastBackup = settingsData.backups.lastBackup
			? new Date(settingsData.backups.lastBackup)
			: null
		const now = new Date()
		const intervalDays = settingsData.backups.backupInterval ?? 7

		if (
			!lastBackup ||
			now.getTime() - lastBackup.getTime() > intervalDays * 24 * 60 * 60 * 1000
		) {
			createBackup()
		}
	} catch (error) {
		console.error('Failed to check auto backup:', error)
	}
}

try {
	//TODO: Без title TEXT NOT NULL не работает. Обязательных полей нет!
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
} catch (error) {
	console.error('Error initializing database:', error)
	throw new Error('Failed to initialize database')
}

if (is.dev) {
	try {
		const row = db.prepare('SELECT COUNT(*) as count FROM books').get() as {
			count: number
		}

		if (row.count === 0) {
			db.prepare(
				`
        INSERT INTO books (
          title,
          totalVolumes,
          currentVolume,
          lastName,
          firstName,
          middleName,
          genre,
          content,
          annotation,
          year,
          tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`,
			).run(
				'Example Title',
				5,
				2,
				'Doe',
				'John',
				'M',
				'Fiction',
				'This is a book content.',
				'A brief description of the book.',
				2023,
				'["Избранное","В наличии"]',
			)
		}
	} catch (error) {
		console.log('Error inseting test data', error)
	}
}

export { db as database, createBackup, maybeAutoBackup }
