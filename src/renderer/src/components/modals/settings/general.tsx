import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme, type Theme } from '@/providers/theme-provider'
import { useModal } from '@/hooks/useModal'
import { ConfirmModal } from '..'
import { useSettings } from '@/hooks/useSettings'

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
	const { resetSettings } = useSettings()
	const { openModal } = useModal()
	const [tempTheme, setTempTheme] = useState<Theme>(theme)

	useEffect(() => {
		setTempTheme(theme)
	}, [theme])

	const handleSelectTheme = (selected: Theme) => {
		setTempTheme(selected)
		setTheme(selected)
	}

	const handleRestoreSettings = () => {
		openModal(ConfirmModal, {
			title: 'Восстановление настроек',
			props: {
				message: 'Восстановить настройки по умолчанию?',
				onConfirm: () => resetSettings,
			},
		})
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

			<div className='flex justify-between items-center'>
				<Button
					variant='outline'
					className='w-full md:w-auto'
					onClick={handleRestoreSettings}
				>
					Восстановить настройки
				</Button>

				<Button variant='ghost' onClick={onClose} className='md:w-auto ml-2'>
					Вернуться
				</Button>
			</div>
		</div>
	)
}
