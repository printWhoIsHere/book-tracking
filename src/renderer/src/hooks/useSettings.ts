import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/ipc'
import { Settings } from 'src/types'

export const useSettings = () => {
	const queryClient = useQueryClient()

	// Получение настроек
	const {
		data: settings,
		isLoading,
		error,
	} = useQuery<Settings, Error>({
		queryKey: ['settings'],
		queryFn: api.getSettings,
	})

	// Обновление настроек
	const updateSettingsMutation = useMutation({
		mutationFn: api.updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['settings'] })
		},
	})

	return {
		settings,
		isLoading,
		error,
		updateSettings: updateSettingsMutation.mutate,
		isUpdating: updateSettingsMutation.isPending,
	}
}
