import { ipcMain } from 'electron'
import { importBooksFromExcel } from '../services/import.service'

ipcMain.handle('import:booksFromExcel', async (_event, filePath?: string) => {
	return await importBooksFromExcel(filePath)
})
