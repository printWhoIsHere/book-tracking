import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useBackups() {
	const queryClient = useQueryClient()

	// Получение списка бэкапов
	const {
		data: backups,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['backups'],
		queryFn: () => window.api.backup.list(),
	})

	// Создание бэкапа
	const createBackup = useMutation({
		mutationFn: () => window.api.backup.create(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['backups'] })
		},
	})

	// Восстановление бэкапа
	const restoreBackup = useMutation({
		mutationFn: (backupFileName: string) =>
			window.api.backup.restore(backupFileName),
	})

	// Удаление бэкапа
	const deleteBackup = useMutation({
		mutationFn: (backupFileName: string) =>
			window.api.backup.delete(backupFileName),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['backups'] })
		},
	})

	return {
		backups,
		isLoading,
		error,
		createBackup: createBackup.mutateAsync,
		restoreBackup: restoreBackup.mutateAsync,
		deleteBackup: deleteBackup.mutateAsync,
	}
}
