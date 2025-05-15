import { ipcRenderer } from 'electron'
import type { Book, BookAdd, BookUpdate } from '@main/modules/book'
import type { Settings } from '@main/modules/settings'

export const api = {
	book: {
		get: (id: number): Promise<Book | null> =>
			ipcRenderer.invoke('book:get', id),
		getAll: (): Promise<Book[]> => ipcRenderer.invoke('book:getAll'),
		add: (
			data: BookAdd,
		): Promise<{ changes: number; lastInsertRowid: number }> =>
			ipcRenderer.invoke('book:add', data),
		update: (id: number, updates: BookUpdate): Promise<void> =>
			ipcRenderer.invoke('book:update', [id, updates]),
		delete: (id: number): Promise<void> =>
			ipcRenderer.invoke('book:delete', id),
		deleteMany: (ids: number[]): Promise<void> =>
			ipcRenderer.invoke('book:deleteMany', ids),
	},

	backup: {
		list: (): Promise<{ backups: string[] }> =>
			ipcRenderer.invoke('backup:list'),
		create: (): Promise<{ backupPath: string }> =>
			ipcRenderer.invoke('backup:create'),
		restore: (backupFileName: string): Promise<void> =>
			ipcRenderer.invoke('backup:restore', backupFileName),
		delete: (backupFileName: string): Promise<void> =>
			ipcRenderer.invoke('backup:delete', backupFileName),
	},

	profile: {
		getActive: (): Promise<string> => ipcRenderer.invoke('profile:get-active'),
		list: (): Promise<string[]> => ipcRenderer.invoke('profile:list'),
		add: (profileName: string): Promise<void> =>
			ipcRenderer.invoke('profile:add', profileName),
		delete: (profileName: string): Promise<void> =>
			ipcRenderer.invoke('profile:delete', profileName),
		switch: (profileName: string): Promise<void> =>
			ipcRenderer.invoke('profile:switch', profileName),
		rename: (oldName: string, newName: string): Promise<void> =>
			ipcRenderer.invoke('profile:rename', [oldName, newName]),
	},

	settings: {
		get: (): Promise<Settings> => ipcRenderer.invoke('settings:get'),
		set: (settings: Settings): Promise<void> =>
			ipcRenderer.invoke('settings:set', settings),
		reset: (): Promise<void> => ipcRenderer.invoke('settings:reset'),
	},

	import: {
		booksFromExcel: (options: {
			filePath: string
			profileName?: string
			createNewProfile?: boolean
		}): Promise<number> => ipcRenderer.invoke('import:booksFromExcel', options),
	},

	export: {
		booksToExcel: (): Promise<string> =>
			ipcRenderer.invoke('export:booksToExcel', null),
	},
}
