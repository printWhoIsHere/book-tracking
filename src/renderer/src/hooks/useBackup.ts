import api from '@/lib/ipc'
import { useQuery } from '@tanstack/react-query'
import { useTypedMutation } from '@/hooks/useTypedMutation'

const BACKUPS_QUERY_KEY = ['backups']

export function useBackup() {
	const {
		data: backups = [],
		isLoading,
		error,
		refetch,
	} = useQuery<string[], Error>({
		queryKey: BACKUPS_QUERY_KEY,
		queryFn: async () => {
			const response = await api.backup.list()
			return response.backups
		},
	})

	const createBackupMutation = useTypedMutation<void, { backupPath: string }>(
		async () => api.backup.create(),
		{
			queryKey: BACKUPS_QUERY_KEY,
			successMessage: 'Резервная копия создана',
			errorMessage: 'Ошибка при создании резервной копии',
		},
	)

	const restoreBackupMutation = useTypedMutation(
		(backupFileName: string) => api.backup.restore(backupFileName),
		{
			queryKey: BACKUPS_QUERY_KEY,
			successMessage: 'Резервная копия восстановлена',
			errorMessage: 'Ошибка при восстановлении резервной копии',
		},
	)

	const deleteBackupMutation = useTypedMutation(
		(backupFileName: string) => api.backup.delete(backupFileName),
		{
			queryKey: BACKUPS_QUERY_KEY,
			successMessage: 'Резервная копия удалена',
			errorMessage: 'Ошибка при удалении резервной копии',
		},
	)

	return {
		backups,
		isLoading,
		error,
		refetch,

		createBackup: createBackupMutation.mutate,
		restoreBackup: restoreBackupMutation.mutate,
		deleteBackup: deleteBackupMutation.mutate,

		isCreating: createBackupMutation.isPending,
		isRestoring: restoreBackupMutation.isPending,
		isDeleting: deleteBackupMutation.isPending,
	}
}
