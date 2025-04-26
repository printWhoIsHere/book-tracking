import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { Book, Settings } from '../types'
import { domReady, useLoadingSpinner } from './loading'

const api = {
	book: {
		get: (id: number): Promise<Book | null> =>
			ipcRenderer.invoke('book:get', id),

		getAll: (): Promise<Book[]> => ipcRenderer.invoke('book:getAll'),

		add: (
			book: Omit<Book, 'id'>,
		): Promise<{ changes: number; lastInsertRowid: number }> =>
			ipcRenderer.invoke('book:add', book),

		update: (
			id: number,
			updates: Partial<Book>,
		): Promise<{ changes: number }> =>
			ipcRenderer.invoke('book:update', id, updates),

		delete: (id: number): Promise<{ changes: number }> =>
			ipcRenderer.invoke('book:delete', id),

		deleteMultiple: (ids: number[]): Promise<{ changes: number }> =>
			ipcRenderer.invoke('book:deleteMultiple', ids),

		archive: (id: number): Promise<{ changes: number }> =>
			ipcRenderer.invoke('book:archive', id),

		unarchive: (id: number): Promise<{ changes: number }> =>
			ipcRenderer.invoke('book:unarchive', id),
	},

	settings: {
		get: (): Promise<Settings> => ipcRenderer.invoke('settings:get'),

		update: (settings: Settings): Promise<void> =>
			ipcRenderer.invoke('settings:update', settings),
	},

	backup: {
		create: (): Promise<string> => ipcRenderer.invoke('backup:create'),

		list: (): Promise<string[]> => ipcRenderer.invoke('backup:list'),

		restore: (backupFileName: string): Promise<void> =>
			ipcRenderer.invoke('backup:restore', backupFileName),

		delete: (backupFileName: string): Promise<void> =>
			ipcRenderer.invoke('backup:delete', backupFileName),
	},

	export: {
		booksToExcel: (): Promise<string> =>
			ipcRenderer.invoke('export:booksToExcel'),
	},
}

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error('Context bridge injection failed:', error)
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI
	// @ts-ignore (define in dts)
	window.api = api
}

// Инициализация загрузчика
const { append, remove } = useLoadingSpinner()

domReady().then(append)

window.onmessage = (event) => {
	if (event.data?.payload === 'removeLoading') remove()
}
setTimeout(remove, 5000)
