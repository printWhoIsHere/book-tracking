import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { domReady, useLoadingSpinner } from '@preload/loading'
import { api } from '@preload/api'

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
