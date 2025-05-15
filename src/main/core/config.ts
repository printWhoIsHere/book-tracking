import { existsSync, mkdirSync } from 'fs'

import { logger } from '@main/core/logger'
import { paths } from '@main/core/paths'

function ensureDirectory(path: string): void {
	if (!existsSync(path)) {
		try {
			mkdirSync(path, { recursive: true })
			logger.debug(`[CONFIG] Created directory: ${path}`)
		} catch (error) {
			logger.error(`[CONFIG ERROR] Failed to create directory: ${path}`, error)
		}
	}
}

export function initConfig(): void {
	Object.values(paths.directories).forEach(ensureDirectory)
}
