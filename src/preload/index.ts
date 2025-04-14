import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { domReady, useLoadingSpinner } from './loading';

const api = {
	getAllBooks: () => ipcRenderer.invoke('book:getAll'),
	getBookById: (id: number) => ipcRenderer.invoke('book:getById', id),
	addBook: (book: any) => ipcRenderer.invoke('book:add', book),
	updateBook: (id: number, updates: any) =>
		ipcRenderer.invoke('book:update', { id, updates }),
	deleteBook: (id: number) => ipcRenderer.invoke('book:delete', id),

	getSettings: () => ipcRenderer.invoke('settings:get'),
	updateSettings: (settings: any) =>
		ipcRenderer.invoke('settings:update', settings),
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error('Context bridge injection failed:', error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}

// Инициализация загрузчика
const { append, remove } = useLoadingSpinner();

domReady().then(append);

window.onmessage = (event) => {
	if (event.data?.payload === 'removeLoading') remove();
};
setTimeout(remove, 5000);
