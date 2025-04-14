import { ipcMain } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { settingsPath } from '../config';

import settings from '../../../data/settings.json';

type Settings = typeof settings;

ipcMain.handle('settings:get', () => {
	try {
		const settings: Settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));

		return settings;
	} catch (error) {
		console.error('Error getting settings:', error);
		throw new Error('Failed to fetch settings from the database');
	}
});

ipcMain.handle('settings:update', (_, newSettings: any) => {
	try {
		writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error updating settings:', error);
		throw new Error('Failed to update settings in the database');
	}
});
