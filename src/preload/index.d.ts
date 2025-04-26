import { ElectronAPI } from '@electron-toolkit/preload'
import type { Book, Settings } from 'src/types'

declare global {
	interface Window {
		electron: ElectronAPI
		api: API
	}
}

export interface API {
	book: {
		get: (id: number) => Promise<Book | null>
		getAll: () => Promise<Book[]>
		add: (
			book: Omit<Book, 'id'>,
		) => Promise<{ changes: number; lastInsertRowid: number }>
		update: (id: number, updates: Partial<Book>) => Promise<{ changes: number }>
		delete: (id: number) => Promise<{ changes: number }>
		deleteMultiple: (ids: number[]) => Promise<{ changes: number }>
		archive: (id: number) => Promise<{ changes: number }>
		unarchive: (id: number) => Promise<{ changes: number }>
	}

	settings: {
		get: () => Promise<Settings>
		update: (settings: Settings) => Promise<void>
	}

	backup: {
		create: () => Promise<string>
		list: () => Promise<string[]>
		restore: (backupFileName: string) => Promise<void>
		delete: (backupFileName: string) => Promise<void>
	}

	export: {
		booksToExcel: () => Promise<string>
	}
}
