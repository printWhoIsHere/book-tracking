import * as xlsx from 'xlsx'
import { writeFile } from 'fs/promises'
import { dialog, app } from 'electron'
import { join } from 'path'

import { getAllBooks } from './book.service'

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

export async function exportBooksToExcel(): Promise<string> {
	const books = await getAllBooks()

	const processedBooks = books.map((book) => ({
		...book,
		tags: parseTags(book.tags),
	}))

	const { canceled, filePath } = await dialog.showSaveDialog({
		title: 'Сохранить книги как...',
		defaultPath: join(app.getPath('desktop'), 'books_export.xlsx'),
		filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
	})

	if (canceled || !filePath) {
		throw new Error('Сохранение отменено пользователем')
	}

	// Генерация Excel-файла
	const workbook = xlsx.utils.book_new()
	const worksheet = xlsx.utils.json_to_sheet(processedBooks)
	xlsx.utils.book_append_sheet(workbook, worksheet, 'Books')

	const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' })

	await writeFile(filePath, excelBuffer)

	return filePath
}
