import { promises as fs } from 'fs'
import { logger } from '@main/core/logger'
import { paths } from '@main/core/paths'
import {
	type Settings,
	SettingsSchema,
	defaultSettings,
} from '@main/modules/settings'

async function getSettings(): Promise<Settings> {
	try {
		const data = await fs.readFile(paths.files.settings, 'utf-8')
		logger.debug('[SETTINGS] Settings loaded successfully')
		return SettingsSchema.parse(JSON.parse(data))
	} catch (error) {
		logger.warn('[SETTINGS] Failed to load settings, restoring defaults')
		try {
			await fs.rename(paths.files.settings, `${paths.files.settings}.corrupted`)
			logger.warn('[SETTINGS] Corrupted settings file renamed')
		} catch (renameError) {
			logger.error(
				'[SETTINGS] Failed to rename corrupted settings file',
				renameError,
			)
		}
		await setSettings(defaultSettings)
		return defaultSettings
	}
}

async function setSettings(settings: Settings): Promise<void> {
	try {
		await fs.writeFile(paths.files.settings, JSON.stringify(settings, null, 2))
		logger.debug('[SETTINGS] Settings updated successfully')
	} catch (error) {
		logger.error('[SETTINGS] Failed to update settings', error)
		throw new Error('Failed to update settings')
	}
}

async function resetSettings(): Promise<void> {
	logger.info('[SETTINGS] Resetting settings to default')
	await setSettings(defaultSettings)
}

export { getSettings, setSettings, resetSettings }
