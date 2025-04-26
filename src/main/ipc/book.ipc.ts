import { ipcMain } from 'electron'
import * as bookService from '../services/book.service'

ipcMain.handle('book:get', (_, id: number) => bookService.getBook(id))
ipcMain.handle('book:getAll', () => bookService.getAllBooks())
ipcMain.handle('book:add', (_, data) => bookService.addBook(data))
ipcMain.handle('book:update', (_, id, updates) =>
	bookService.updateBook(id, updates),
)
ipcMain.handle('book:delete', (_, id) => bookService.deleteBook(id))
ipcMain.handle('book:deleteMultiple', (_, ids) =>
	bookService.deleteMultipleBooks(ids),
)
ipcMain.handle('book:archive', (_, id) => bookService.archiveBook(id))
ipcMain.handle('book:unarchive', (_, id) => bookService.unarchiveBook(id))
