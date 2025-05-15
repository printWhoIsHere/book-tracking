import { promises as fs } from 'fs'
import { logger } from '@main/core/logger'
import { paths } from '@main/core/paths'
import { getProfileDatabasePath, getProfilePath } from '@main/utils'
import { closeDatabase, getDatabase, removeDatabase } from '@main/database'
import { type Settings, getSettings, setSettings } from '@main/modules/settings'

const DEFAULT_PROFILE_NAME = 'default'

async function getActiveProfileName(): Promise<string> {
	try {
		const settings = await getSettings()
		const profiles = await listProfiles()
		let activeProfile = settings.general.activeProfile

		if (!profiles.includes(activeProfile)) {
			activeProfile = await handleMissingProfile(settings, profiles)
		}

		return activeProfile
	} catch (error) {
		logger.error('[PROFILE ERROR] Failed to get active profile:', error)
		throw new Error('Failed to get active profile.')
	}
}

async function handleMissingProfile(
	settings: Settings,
	profiles: string[],
): Promise<string> {
	try {
		const defaultProfile = profiles[0] || DEFAULT_PROFILE_NAME
		settings.general.activeProfile = defaultProfile
		await setSettings(settings)
		logger.warn(
			`[PROFILE] Active profile not found, switched to "${defaultProfile}"`,
		)
		return defaultProfile
	} catch (error) {
		logger.error('[PROFILE ERROR] Failed to handle missing profile:', error)
		throw new Error('Failed to handle missing profile.')
	}
}

async function ensureProfileDirectories(
	profile: string = DEFAULT_PROFILE_NAME,
): Promise<void> {
	const path = getProfilePath(profile)
	console.log(path)
	try {
		await fs.access(path)
	} catch {
		await fs.mkdir(path, { recursive: true })
		logger.info(`[PROFILE] Created profile directory: ${path}`)
	}
}

async function listProfiles(): Promise<string[]> {
	try {
		const entries = await fs.readdir(paths.directories.profiles, {
			withFileTypes: true,
		})
		return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name)
	} catch (error) {
		logger.error('[PROFILE] Unable to list profiles', error)
		throw new Error('Failed to list profiles.')
	}
}

async function createProfile(profileName: string): Promise<void> {
	try {
		const profiles = await listProfiles()
		if (profiles.includes(profileName)) {
			throw new Error(`Profile "${profileName}" already exists.`)
		}

		await getDatabase(profileName)
		logger.info(
			`[PROFILE] Created and initialized DB for profile: ${profileName}`,
		)
	} catch (error) {
		logger.error(
			`[PROFILE ERROR] Failed to create profile "${profileName}":`,
			error,
		)
		throw new Error(`Failed to create profile "${profileName}".`)
	}
}

async function removeProfile(profileName: string): Promise<void> {
	try {
		const settings = await getSettings()
		if (settings.general.activeProfile === profileName) {
			logger.warn(
				`[PROFILE] Attempted to delete active profile: ${profileName}`,
			)
			throw new Error(`Cannot delete active profile "${profileName}"`)
		}

		await removeDatabase(profileName)
		const profilePath = getProfileDatabasePath(profileName)
		await fs.rm(profilePath, { force: true })
		logger.info(`[PROFILE] Deleted profile: ${profileName}`)
	} catch (error) {
		logger.error(
			`[PROFILE ERROR] Failed to delete profile: ${profileName}`,
			error,
		)
		throw new Error(`Failed to delete profile: ${profileName}.`)
	}
}

async function setActiveProfile(profileName: string): Promise<void> {
	try {
		const profiles = await listProfiles()
		if (!profiles.includes(profileName)) {
			throw new Error(`Profile "${profileName}" does not exist.`)
		}

		const settings = await getSettings()
		settings.general.activeProfile = profileName
		await setSettings(settings)

		logger.info(`[PROFILE] Switched active profile to: ${profileName}`)
	} catch (error) {
		logger.error(
			`[PROFILE ERROR] Failed to set active profile to "${profileName}":`,
			error,
		)
		throw new Error(`Failed to set active profile to "${profileName}".`)
	}
}

async function renameProfile(oldName: string, newName: string): Promise<void> {
	try {
		const profiles = await listProfiles()

		if (!profiles.includes(oldName)) {
			throw new Error(`Profile "${oldName}" does not exist.`)
		}

		if (profiles.includes(newName)) {
			throw new Error(`Profile "${newName}" already exists.`)
		}

		const oldPath = getProfileDatabasePath(oldName)
		const newPath = getProfileDatabasePath(newName)

		await closeDatabase(oldName)
		await fs.rename(oldPath, newPath)

		const settings = await getSettings()
		if (settings.general.activeProfile === oldName) {
			settings.general.activeProfile = newName
			await setSettings(settings)
		}

		logger.info(`[PROFILE] Renamed profile from "${oldName}" to "${newName}"`)
	} catch (error) {
		logger.error(
			`[PROFILE ERROR] Failed to rename profile from "${oldName}" to "${newName}":`,
			error,
		)
		throw new Error(
			`Failed to rename profile from "${oldName}" to "${newName}".`,
		)
	}
}

export {
	getActiveProfileName,
	handleMissingProfile,
	ensureProfileDirectories,
	listProfiles,
	createProfile,
	removeProfile,
	renameProfile,
	setActiveProfile,
	getProfileDatabasePath,
}
