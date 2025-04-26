import api from './ipc'

export async function exportBooks() {
	try {
		const filePath = await api.export.booksToExcel()
		return filePath
	} catch (error) {
		console.error('Ошибка экспорта книг:', error)
		throw error
	}
}
