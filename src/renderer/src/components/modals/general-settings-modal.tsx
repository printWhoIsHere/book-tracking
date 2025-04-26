import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme, type Theme } from '@/providers/theme-provider'
import { ModalProps } from '@/hooks/useModal'

const themeOptions: {
	value: Theme
	label: string
	icon: LucideIcon
}[] = [
	{ value: 'light', label: 'Светлая', icon: Sun },
	{ value: 'dark', label: 'Тёмная', icon: Moon },
	{ value: 'system', label: 'Системная', icon: Laptop },
]

export function GeneralSettingsModal({ onClose }: ModalProps) {
	const { theme, setTheme } = useTheme()
	const [tempTheme, setTempTheme] = useState<Theme>(theme)

	useEffect(() => {
		setTempTheme(theme)
	}, [theme])

	const handleSelectTheme = (selected: Theme) => {
		setTempTheme(selected)
		setTheme(selected)
	}

	return (
		<div className='flex flex-col justify-between h-full space-y-4'>
			<div className='grid grid-cols-3 gap-4'>
				{themeOptions.map((option) => {
					const isSelected = tempTheme === option.value
					return (
						<div
							key={option.value}
							onClick={() => handleSelectTheme(option.value)}
							className={`cursor-pointer rounded-lg border p-4 text-center transition-colors ${
								isSelected
									? 'border-primary bg-primary text-primary-foreground'
									: 'border-muted bg-muted text-muted-foreground hover:border-accent hover:bg-accent'
							}`}
						>
							<div className='flex flex-col items-center space-y-2'>
								<option.icon className='w-6 h-6' />
								<span className='text-sm font-medium'>{option.label}</span>
							</div>
						</div>
					)
				})}
			</div>

			<div className='w-full flex justify-end'>
				<Button variant='ghost' onClick={onClose}>
					Вернуться
				</Button>
			</div>
		</div>
	)
}
