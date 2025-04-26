import { readFileSync, writeFileSync } from 'fs'
import { settingsPath } from '../config'

import { Settings } from '../../types'

function getSettings(): Settings {
	const data = readFileSync(settingsPath, 'utf-8')
	return JSON.parse(data)
}

function updateSettings(newSettings: Settings) {
	writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf-8')
}

export { getSettings, updateSettings }
