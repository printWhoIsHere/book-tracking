import { ipcMain } from 'electron'
import * as settingsService from '../services/settings.service'

ipcMain.handle('settings:get', async () => settingsService.getSettings())
ipcMain.handle('settings:update', async (_, newSettings) => {
	settingsService.updateSettings(newSettings)
	return true
})
