import api from '@/lib/ipc'
import { useQuery } from '@tanstack/react-query'
import { useTypedMutation } from '@/hooks/useTypedMutation'

const QUERY_KEYS = {
	profiles: ['profiles'],
	activeProfile: ['profile-active'],
}

export const useProfile = () => {
	const {
		data: profiles = [],
		isLoading,
		error,
		refetch,
	} = useQuery<string[], Error>({
		queryKey: QUERY_KEYS.profiles,
		queryFn: api.profile.list,
	})

	const {
		data: activeProfile,
		isLoading: isActiveLoading,
		error: activeError,
		refetch: refetchActive,
	} = useQuery<string, Error>({
		queryKey: QUERY_KEYS.activeProfile,
		queryFn: api.profile.getActive,
	})

	const addProfile = useTypedMutation(api.profile.add, {
		queryKey: QUERY_KEYS.profiles,
		successMessage: 'Профиль добавлен',
		errorMessage: 'Ошибка при добавлении профиля',
	})

	const deleteProfile = useTypedMutation(api.profile.delete, {
		queryKey: QUERY_KEYS.profiles,
		successMessage: 'Профиль удалён',
		errorMessage: 'Ошибка при удалении профиля',
	})

	const switchProfile = useTypedMutation(api.profile.switch, {
		queryKey: QUERY_KEYS.activeProfile,
		successMessage: 'Профиль переключён',
		errorMessage: 'Ошибка при переключении профиля',
	})

	const renameProfile = useTypedMutation(
		([oldName, newName]: [string, string]) =>
			api.profile.rename(oldName, newName),
		{
			queryKey: QUERY_KEYS.profiles,
			successMessage: 'Профиль переименован',
			errorMessage: 'Ошибка при переименовании профиля',
		},
	)

	return {
		profiles,
		activeProfile,
		refetch,

		isLoading,
		isActiveLoading,

		error,
		activeError,
		refetchActive,

		addProfile: addProfile.mutate,
		deleteProfile: deleteProfile.mutate,
		switchProfile: switchProfile.mutate,
		renameProfile: renameProfile.mutate,

		isAdding: addProfile.isPending,
		isDeleting: deleteProfile.isPending,
		isSwitching: switchProfile.isPending,
		isRenaming: renameProfile.isPending,
	}
}
