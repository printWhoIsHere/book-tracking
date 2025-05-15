import { ElectronAPI } from '@electron-toolkit/preload'
import type { Book, BookUpdate, BookAdd } from '@main/modules/book'
import type { Settings } from '@main/modules/settings'

declare global {
	interface Window {
		electron: ElectronAPI
		api: API
	}
}

export interface API {
	book: {
		get(id: number): Promise<Book | null>
		getAll(): Promise<Book[]>
		add(data: BookAdd): Promise<{ changes: number; lastInsertRowid: number }>
		update(id: number, updates: BookUpdate): Promise<void>
		delete(id: number): Promise<void>
		deleteMany(ids: number[]): Promise<void>
	}

	backup: {
		list(): Promise<{ backups: string[] }>
		create(): Promise<{ backupPath: string }>
		restore(backupFileName: string): Promise<void>
		delete(backupFileName: string): Promise<void>
	}

	profile: {
		getActive(): Promise<string>
		list(): Promise<string[]>
		add(profileName: string): Promise<void>
		delete(profileName: string): Promise<void>
		switch(profileName: string): Promise<void>
		rename(oldName: string, newName: string): Promise<void>
	}

	settings: {
		get(): Promise<Settings>
		set(settings: Settings): Promise<void>
		reset(): Promise<void>
	}

	import: {
		booksFromExcel(options: {
			filePath: string
			profileName?: string
			createNewProfile?: boolean
		}): Promise<number>
	}

	export: {
		booksToExcel(): Promise<string>
	}
}
