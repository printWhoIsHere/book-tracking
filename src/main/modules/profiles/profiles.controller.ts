import { z } from 'zod'
import { handleIpc } from '@main/utils'

import {
	createProfile,
	getActiveProfileName,
	listProfiles,
	removeProfile,
	renameProfile,
	setActiveProfile,
} from '@main/modules/profiles'

handleIpc('profile:get-active', z.undefined(), async () => {
	return await getActiveProfileName()
})

handleIpc('profile:list', z.undefined(), async () => {
	return await listProfiles()
})

handleIpc('profile:add', z.string(), async (_, name) => {
	await createProfile(name)
	return { success: true }
})

handleIpc('profile:delete', z.string(), async (_, name) => {
	await removeProfile(name)
	return { success: true }
})

handleIpc('profile:switch', z.string(), async (_, name) => {
	await setActiveProfile(name)
	return { success: true }
})

handleIpc(
	'profile:rename',
	z.tuple([z.string(), z.string()]),
	async (_, [oldName, newName]) => {
		await renameProfile(oldName, newName)
		return { success: true }
	},
)
