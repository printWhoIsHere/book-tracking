import { ipcMain } from 'electron'
import { ZodType, ZodError } from 'zod'
import { logger } from '@main/core/logger'

export const handleIpc = <T>(
	channel: string,
	schema: ZodType<T> | null,
	handler: (event: Electron.IpcMainInvokeEvent, data: T) => any,
) => {
	ipcMain.handle(channel, async (event, data) => {
		logger.debug(`[IPC] Handling channel: ${channel}`)

		try {
			const validated = schema ? schema.parse(data) : data
			const result = await handler(event, validated)

			logger.debug(`[IPC] Success: ${channel}`)
			return result
		} catch (error) {
			if (error instanceof ZodError) {
				logger.warn(`[IPC] Zod validation failed: ${channel}`, error.errors)
				return { error: error.errors }
			}

			logger.error(`[IPC] Error in channel: ${channel}`, error)
			throw error
		}
	})
}
