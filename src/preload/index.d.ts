import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: API
	}
}

interface API {
	getAllData: () => Promise<Data[]>
	getDataById: (key: number) => Promise<Data | null>
	updateData: (key: number, value: any) => Promise<boolean>
	addData: (value: any) => Promise<{ id: number }>

	removeData: (key: number) => Promise<boolean>
	getSettings: () => Promise<Settings>
	updateSettings: (settings: Partial<Settings>) => Promise<boolean>
}
