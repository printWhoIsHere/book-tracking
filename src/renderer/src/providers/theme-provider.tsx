import { createContext, useContext, useEffect, useState } from 'react'
import { useSettings } from '@/hooks/useSettings'

export type Theme = Settings['general']['theme']

type ThemeProviderProps = {
	children: React.ReactNode
}

type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const { settings, setSettings: updateSettings } = useSettings()
	const [theme, setThemeState] = useState<Theme>('system')

	useEffect(() => {
		if (settings?.general?.theme) {
			setThemeState(settings.general.theme)
		}
	}, [settings])

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
		if (settings) {
			updateSettings({
				...settings,
				general: {
					...settings.general,
					theme: newTheme,
				},
			})
		}
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme }} {...props}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider')

	return context
}
