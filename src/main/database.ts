import Database from 'better-sqlite3'
import { databasePath } from './config'

const db = new Database(databasePath)
// TODO: Функция создания резервных копий

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

// db.prepare(
// 	`
//   INSERT INTO data (
// 			title,
// 			totalVolumes,
// 			currentVolume,
// 			lastName,
// 			firstName,
// 			middleName,
// 			genre,
// 			content,
// 			annotation,
// 			year,
// 			tags
// 		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
// `,
// ).run(
// 	'Example Title',
// 	5,
// 	2,
// 	'Doe',
// 	'John',
// 	'M',
// 	'Fiction',
// 	'This is a book content.',
// 	'A brief description of the book.',
// 	2023,
// 	'["science"], ["thriller"]',
// )

export { db as database }
