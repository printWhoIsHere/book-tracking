import { app } from 'electron'
import { electronApp } from '@electron-toolkit/utils'

import { maybeAutoBackup } from '@main/modules/backups'
import { createWindow } from '@main/core/window'
import { initConfig } from '@main/core/config'

import '@main/core/app'
import '@main/ipc'
import { getDatabase } from './database'

app.whenReady().then(async () => {
	electronApp.setAppUserModelId('com.electron')

	initConfig()
	await getDatabase()
	maybeAutoBackup()

	createWindow()
})
