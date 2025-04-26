import { ipcMain } from 'electron'
import { exportBooksToExcel } from '../services/export.service'

ipcMain.handle('export:booksToExcel', async () => {
	return await exportBooksToExcel()
})
