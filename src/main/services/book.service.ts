import { RunResult } from 'better-sqlite3'

import { database } from '../database'
import { Book } from '../../types'

function parseTags(tags: unknown): string[] {
	if (typeof tags === 'string') {
		try {
			return JSON.parse(tags)
		} catch {
			return []
		}
	}
	return []
}

// Функция для получения книги по ID
function getBook(id: number): Book | null {
	const result = database
		.prepare('SELECT * FROM books WHERE id = ?')
		.get(id) as Book | undefined
	if (result) {
		result.tags = parseTags(result.tags)
	}
	return result ?? null
}

async function getAllBooks(): Promise<Book[]> {
	const books = database.prepare('SELECT * FROM books').all() as Book[]
	return books.map((book) => ({
		...book,
		tags: parseTags(book.tags),
	}))
}

function addBook(data: Book) {
	const {
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
		tags,
	} = data

	const stmt = database.prepare(`
		INSERT INTO books (
			title, totalVolumes, currentVolume,
			lastName, firstName, middleName,
			genre, content, annotation,
			year, tags
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)

	const result: RunResult = stmt.run(
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
		JSON.stringify(tags),
	)

	return { changes: result.changes, lastInsertRowid: result.lastInsertRowid }
}

function updateBook(id: number, updates: Partial<Book>) {
	const fields = Object.keys(updates)
	if (fields.length === 0) return { changes: 0 }

	const placeholders = fields.map((field) => `${field} = ?`).join(', ')
	const values = fields.map((key) =>
		key === 'tags'
			? JSON.stringify((updates as any)[key])
			: (updates as any)[key],
	)

	const stmt = database.prepare(`UPDATE books SET ${placeholders} WHERE id = ?`)
	const result: RunResult = stmt.run(...values, id)

	return { changes: result.changes }
}

function deleteBook(id: number) {
	const result = database.prepare('DELETE FROM books WHERE id = ?').run(id)
	return { changes: result.changes }
}

function deleteMultipleBooks(ids: number[]) {
	if (ids.length === 0) return { changes: 0 }

	const placeholders = ids.map(() => '?').join(', ')
	const stmt = database.prepare(
		`DELETE FROM books WHERE id IN (${placeholders})`,
	)
	const result: RunResult = stmt.run(...ids)

	return { changes: result.changes }
}

function archiveBook(id: number) {
	const result = database
		.prepare('UPDATE books SET isArchived = 1 WHERE id = ?')
		.run(id)
	return { changes: result.changes }
}

function unarchiveBook(id: number) {
	const result = database
		.prepare('UPDATE books SET isArchived = 0 WHERE id = ?')
		.run(id)
	return { changes: result.changes }
}

export {
	getBook,
	getAllBooks,
	addBook,
	updateBook,
	deleteBook,
	deleteMultipleBooks,
	archiveBook,
	unarchiveBook,
}
