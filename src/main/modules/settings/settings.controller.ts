import { z } from 'zod'

import { handleIpc } from '@main/utils/ipc'

import { SettingsSchema } from './settings.schema'
import { getSettings, setSettings, resetSettings } from './settings.service'

handleIpc('settings:get', z.undefined(), async () => {
	return await getSettings()
})

handleIpc('settings:set', SettingsSchema, async (_, data) => {
	await setSettings(data)
	return { success: true }
})

handleIpc('settings:reset', z.undefined(), async () => {
	await resetSettings()
	return { success: true }
})
