import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import api from '@/lib/ipc'
import { useToast } from '@/hooks/useToast'

import { Settings } from 'src/types'

export const useSettings = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	// Получение настроек
	const {
		data: settings,
		isLoading,
		error,
	} = useQuery<Settings, Error>({
		queryKey: ['settings'],
		queryFn: api.settings.get,
	})

	// Обновление настроек
	const updateSettingsMutation = useMutation({
		mutationFn: api.settings.update,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['settings'] })
			toast({ description: 'Настройки сохранены', variant: 'success' })
		},
		onError: () => {
			toast({
				description: 'Ошибка при сохранении настроек',
				variant: 'destructive',
			})
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
