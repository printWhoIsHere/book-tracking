import { dbGetAll, dbGetOne, dbRun } from '@main/database/helpers'
import type { Book, BookAdd, BookUpdate } from './book.schema'
import { logger } from '@main/core/logger'
import { parseTags, parseTagsInArray } from '@main/utils/tags'

async function getBookById(id: number): Promise<Book | null> {
	logger.debug(`[BOOK] Get book by id: ${id}`)
	const result = await dbGetOne<Book>('SELECT * FROM books WHERE id = ?', [id])
	if (!result) {
		logger.debug(`[BOOK] Book not found with id: ${id}`)
	}
	return result ? parseTags(result) : null
}

async function getAllBooks(): Promise<Book[]> {
	logger.debug('[BOOK] Get all books')
	const books = await dbGetAll<Book>('SELECT * FROM books')
	return parseTagsInArray(books)
}

async function searchBooks(query: string): Promise<Book[]> {
	logger.debug(`[BOOK] Search books with query: "${query}"`)

	const searchableFields = [
		'title',
		'lastName',
		'firstName',
		'middleName',
		'content',
		'annotation',
	]
	const whereClause = searchableFields.map((f) => `${f} LIKE ?`).join(' OR ')
	const likeParams = searchableFields.map(() => `%${query}%`)

	try {
		const results = await dbGetAll<Book>(
			`SELECT * FROM books WHERE ${whereClause}`,
			likeParams,
		)
		logger.debug(`[BOOK] Found ${results.length} results`)
		return parseTagsInArray(results)
	} catch (err) {
		logger.error('[BOOK] Error while searching books:', err)
		return []
	}
}

async function addNewBook(data: BookAdd) {
	logger.debug('[BOOK] Add new book', data)

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

	const result = await dbRun(
		`INSERT INTO books (
      title, totalVolumes, currentVolume,
      lastName, firstName, middleName,
      genre, content, annotation,
      year, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			title ?? null,
			totalVolumes ?? null,
			currentVolume ?? null,
			lastName ?? null,
			firstName ?? null,
			middleName ?? null,
			genre ?? null,
			content ?? null,
			annotation ?? null,
			year ?? null,
			JSON.stringify(tags ?? []),
		],
	)

	logger.debug(`[BOOK] Book added with id: ${result.lastInsertRowid}`)

	return {
		changes: result.changes,
		lastInsertRowid: Number(result.lastInsertRowid),
	}
}

async function updateBookById(id: number, updates: BookUpdate) {
	logger.debug(`[BOOK] Update book id: ${id}`, updates)

	const fields = Object.keys(updates)
	if (fields.length === 0) {
		logger.debug('[BOOK] No fields to update')
		return { changes: 0 }
	}

	const placeholders = fields.map((field) => `${field} = ?`).join(', ')
	const values = fields.map((key) => {
		const value = (updates as any)[key]
		return key === 'tags' ? JSON.stringify(value) : value
	})

	const query = `UPDATE books SET ${placeholders} WHERE id = ?`
	const result = await dbRun(query, [...values, id])

	logger.debug(`[BOOK] Updated book ${id}, changes: ${result.changes}`)
	return { changes: result.changes }
}

async function deleteBookById(id: number) {
	logger.debug(`[BOOK] Delete book by id: ${id}`)
	const result = await dbRun('DELETE FROM books WHERE id = ?', [id])
	logger.debug(`[BOOK] Deleted book ${id}, changes: ${result.changes}`)
	return { changes: result.changes }
}

async function deleteMultipleBooksById(ids: number[]) {
	logger.debug(`[BOOK] Delete multiple books: [${ids.join(', ')}]`)
	if (ids.length === 0) {
		logger.debug('[BOOK] No ids provided for deletion')
		return { changes: 0 }
	}

	const placeholders = ids.map(() => '?').join(', ')
	const result = await dbRun(
		`DELETE FROM books WHERE id IN (${placeholders})`,
		ids,
	)

	logger.debug(`[BOOK] Deleted ${result.changes} books`)
	return { changes: result.changes }
}

export {
	getBookById,
	getAllBooks,
	searchBooks,
	addNewBook,
	updateBookById,
	deleteBookById,
	deleteMultipleBooksById,
}
