import { ipcMain } from 'electron'
import * as backupService from '../services/backup.service'

ipcMain.handle('backup:create', async () => {
	const backupPath = await backupService.createBackup()
	return backupPath
})

ipcMain.handle('backup:list', async () => {
	const backups = await backupService.listBackups()
	return backups
})

ipcMain.handle('backup:restore', async (_, backupFileName: string) => {
	await backupService.restoreBackup(backupFileName)
	return true
})
