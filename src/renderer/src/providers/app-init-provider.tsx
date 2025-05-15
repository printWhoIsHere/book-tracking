import { useEffect, useState } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { useProfile } from '@/hooks/useProfile'

export const AppInitProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const {
		isLoading: isSettingsLoading,
		error: settingsError,
		refetch,
	} = useSettings()
	const {
		isLoading: isProfileLoading,
		error: profileError,
		refetchActive,
	} = useProfile()

	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		if (!isSettingsLoading && !isProfileLoading) {
			setIsReady(true)
		}
	}, [isSettingsLoading, isProfileLoading])

	if (settingsError || profileError) {
		return (
			<div className='p-4 text-red-500'>
				Ошибка инициализации: {settingsError?.message || profileError?.message}
				<button
					onClick={() => {
						refetch()
						refetchActive()
					}}
					className='ml-2 underline'
				>
					Повторить
				</button>
			</div>
		)
	}

	if (!isReady) {
		return <div className='p-4'>Загрузка настроек и профиля...</div>
	}

	return <>{children}</>
}
