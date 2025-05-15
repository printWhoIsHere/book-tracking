import { z } from 'zod'
import { handleIpc } from '@main/utils'

import {
	createBackup,
	listBackups,
	deleteBackup,
	restoreBackup,
} from './backups.service'

handleIpc('backup:create', null, async () => {
	const path = await createBackup()
	return { path }
})

handleIpc('backup:list', null, async () => {
	const backups = await listBackups()
	return { backups }
})

handleIpc(
	'backup:delete',
	z.object({ fileName: z.string().min(1) }),
	async (_, { fileName }) => {
		await deleteBackup(fileName)
		return { success: true }
	},
)

handleIpc(
	'backup:restore',
	z.object({
		zipFileName: z.string().min(1),
		profileName: z.string().min(1),
	}),
	async (_, { zipFileName, profileName }) => {
		await restoreBackup(zipFileName, profileName)
		return { success: true }
	},
)
