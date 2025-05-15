import { useQuery } from '@tanstack/react-query'

import api from '@/lib/ipc'
import { useTypedMutation } from '@/hooks/useTypedMutation'

const SETTINGS_QUERY_KEY = ['settings']

export const useSettings = () => {
	const {
		data: settings,
		isLoading,
		error,
		refetch,
	} = useQuery<Settings, Error>({
		queryKey: SETTINGS_QUERY_KEY,
		queryFn: api.settings.get,
	})

	const setSettingsMutation = useTypedMutation<Settings>(api.settings.set, {
		queryKey: SETTINGS_QUERY_KEY,
		successMessage: 'Настройки сохранены',
		errorMessage: 'Ошибка при сохранении настроек',
	})

	const resetSettingsMutation = useTypedMutation(api.settings.reset, {
		queryKey: SETTINGS_QUERY_KEY,
		successMessage: 'Настройки сброшены',
		errorMessage: 'Ошибка сброса настроек',
	})

	return {
		settings: settings!,
		isLoading,
		error,
		refetch,

		setSettings: setSettingsMutation.mutate,
		resetSettings: resetSettingsMutation.mutate,

		isUpdating: setSettingsMutation.isPending,
		isResetting: resetSettingsMutation.isPending,
	}
}
