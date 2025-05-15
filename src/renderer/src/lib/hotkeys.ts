type ModifierKey = 'ctrl' | 'shift' | 'alt' | 'meta'

type BaseHotkey<T extends string | string[]> = {
	key: T
	modifiers: ModifierKey | ModifierKey[]
	description: string
}

type HotkeyMap = {
	switchProfiles: BaseHotkey<string[]>
	search: BaseHotkey<string>
	sidebar: BaseHotkey<string>
}

const HOTKEYS: HotkeyMap = {
	switchProfiles: {
		key: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
		description: 'Switch profiles 1-9',
		modifiers: ['ctrl', 'meta'],
	},
	search: {
		key: 'f',
		modifiers: ['ctrl', 'meta'],
		description: 'Open search input',
	},
	sidebar: {
		key: 'b',
		modifiers: ['ctrl', 'meta'],
		description: 'Open/Close sidebar',
	},
} as const

const generateHotkeyCombos = (
	keys: string[],
	modifiers: string[],
): string[] => {
	return keys.flatMap((key) => modifiers.map((mod) => `${mod}+${key}`))
}

const formatModifiers = (modifiers: ModifierKey | ModifierKey[]): string => {
	if (Array.isArray(modifiers)) {
		return modifiers.join('+')
	} else {
		return modifiers
	}
}

function formatHotkeyLabel(key: string): string {
	return `⌘${key}`
}

export { HOTKEYS, generateHotkeyCombos, formatHotkeyLabel, formatModifiers }
