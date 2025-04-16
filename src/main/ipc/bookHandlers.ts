import { ipcMain } from 'electron'
import { database } from '../database'
import { Book } from '../../types'

ipcMain.handle('book:getAll', () => {
	try {
		const query = 'SELECT * FROM books'
		const result = database.prepare(query).all()

		return result
	} catch (error) {
		console.error('Error getting all books:', error)
		throw new Error('Failed to fetch books from the database')
	}
})

ipcMain.handle('book:getById', (_, id: number) => {
	try {
		const query = `SELECT * FROM books WHERE id = ${id}`
		const result = database.prepare(query).get()

		return result
	} catch (error) {
		console.error('Error getting book by id:', error)
		throw new Error('Failed to fetch book from the database')
	}
})

ipcMain.handle('book:update', (_, id: number, field: string, value: any) => {
	try {
		const query = `UPDATE books SET ${field} = ? WHERE id = ?`
		const result = database.prepare(query).run(value, id)

		return result
	} catch (error) {
		console.error('Error updating book:', error)
		throw new Error('Failed to update book in the database')
	}
})

ipcMain.handle('book:delete', (_, id: number) => {
	try {
		const query = `DELETE FROM books WHERE id = ?`
		const result = database.prepare(query).run(id)

		return result
	} catch (error) {
		console.error('Error deleting book:', error)
		throw new Error('Failed to delete book from the database')
	}
})

ipcMain.handle('book:add', (_, data: Book) => {
	try {
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
		`)

		const result = stmt.run(
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

		return result
	} catch (error) {
		console.error('Error adding book:', error)
		throw new Error('Failed to add book to the database')
	}
})

// TODO: Поиск, Фильтрация, Сортировка, Пагинация, Импорт/Экспорт, Архивация?.

// Для сложных поисков (например, с использованием LIKE в SQL)
// ipcMain.handle('search-books', (_, query: string) => {
// 	const stmt = database.prepare(
// 		'SELECT * FROM books WHERE title LIKE ? OR genre LIKE ?',
// 	)
// 	return stmt.all(`%${query}%`, `%${query}%`)
// })
