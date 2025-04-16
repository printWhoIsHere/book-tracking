import { ElectronAPI } from '@electron-toolkit/preload'
import type { Book } from 'src/types'

declare global {
	interface Window {
		electron: ElectronAPI
		api: API
	}
}

interface API {
	getAllBooks: () => Promise<Book[]>
	getBookById: (id: number) => Promise<Book | undefined>
	addBook: (book: Omit<Book, 'id'>) => Promise<{ id: number }>
	updateBook: (id: number, field: string, value: any) => Promise<void>
	removeBook: (id: number) => Promise<void>

	getSettings: () => Promise<Settings>
	updateSettings: (settings: Settings) => Promise<void>
}
