import * as xlsx from 'xlsx'
import { dialog } from 'electron'
import { readFile } from 'fs/promises'

import { Book } from '../../types'
import { database } from '../database'

function parseTags(tags: unknown): string[] {
	if (typeof tags === 'string') {
		try {
			const parsedTags = JSON.parse(tags)
			if (Array.isArray(parsedTags)) {
				return parsedTags
			}
		} catch {
			return [tags]
		}
	}

	if (Array.isArray(tags)) {
		return tags
	}

	return []
}

async function importBooksFromExcel(filePath: string): Promise<void> {
	const fileBuffer = await readFile(filePath)
	const workbook = xlsx.read(fileBuffer, { type: 'buffer' })
	const worksheet = workbook.Sheets[workbook.SheetNames[0]]
	const booksData = xlsx.utils.sheet_to_json(worksheet)

	for (const bookData of booksData) {
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
		} = bookData as Book

		const stmt = database.prepare(`
			INSERT INTO books (
				title, totalVolumes, currentVolume,
				lastName, firstName, middleName,
				genre, content, annotation,
				year, tags
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`)

		stmt.run(
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
			JSON.stringify(parseTags(tags)),
		)
	}

	console.log('Данные успешно импортированы!')
}

export { importBooksFromExcel }
