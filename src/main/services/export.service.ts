import * as xlsx from 'xlsx'
import { writeFile } from 'fs/promises'
import { dialog, app } from 'electron'
import { join } from 'path'

import { getAllBooks } from './book.service'

export async function exportBooksToExcel(): Promise<string> {
	const books = await getAllBooks()

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
	const worksheet = xlsx.utils.json_to_sheet(books)
	xlsx.utils.book_append_sheet(workbook, worksheet, 'Books')

	const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' })

	await writeFile(filePath, excelBuffer)

	return filePath
}
