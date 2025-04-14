import { app } from 'electron'
import path from 'path'
import { is } from '@electron-toolkit/utils'
import { existsSync, mkdirSync } from 'fs'

const dataDirectory = is.dev
	? path.join(__dirname, '../../data')
	: app.getPath('userData')

const databasePath = path.join(dataDirectory, 'database.db')
const settingsPath = path.join(dataDirectory, 'settings.json')
const backupsDirectory = path.join(dataDirectory, 'backups')

if (!existsSync(dataDirectory)) {
	mkdirSync(dataDirectory, { recursive: true })
}

if (!existsSync(backupsDirectory)) {
	mkdirSync(backupsDirectory, { recursive: true })
}

console.log('Path Database >>> ', databasePath)
console.log('Path Settings >>> ', settingsPath)
console.log('Backups Path >>> ', backupsDirectory)

export { dataDirectory, databasePath, settingsPath, backupsDirectory }
