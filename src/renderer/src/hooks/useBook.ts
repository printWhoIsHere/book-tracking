import { useQuery } from '@tanstack/react-query'

import api from '@/lib/ipc'
import { useTypedMutation } from '@/hooks/useTypedMutation'
import { useProfile } from '@/hooks/useProfile'

const BOOKS_QUERY_KEY = (profile: string) => ['books', profile]

export const useBook = () => {
	const { activeProfile } = useProfile()

	const {
		data: books = [],
		isLoading,
		error,
		refetch,
	} = useQuery<Book[], Error>({
		queryKey: BOOKS_QUERY_KEY(activeProfile ?? ''),
		queryFn: async () => {
			return await api.book.getAll()
		},
		enabled: !!activeProfile,
	})

	const addBookMutation = useTypedMutation<Omit<Book, 'id'>>(
		async (newBook) => {
			newBook.tags ? JSON.stringify(newBook.tags) : undefined
			return api.book.add(newBook)
		},
		{
			queryKey: BOOKS_QUERY_KEY(activeProfile ?? ''),
			successMessage: 'Книга добавлена',
			errorMessage: 'Ошибка добавления книги',
		},
	)

	const updateBookMutation = useTypedMutation<{
		id: number
		updates: Partial<Book>
	}>(
		({ id, updates }) => {
			return api.book.update(id, updates)
		},
		{
			queryKey: BOOKS_QUERY_KEY(activeProfile || ''),
			successMessage: 'Книга обновлена',
			errorMessage: 'Ошибка обновления книги',
		},
	)

	const deleteBookMutation = useTypedMutation<number>(api.book.delete, {
		queryKey: BOOKS_QUERY_KEY(activeProfile || ''),
		successMessage: 'Книга удалена',
		errorMessage: 'Ошибка удаления книги',
		toastVariant: 'warning',
	})

	const deleteBooksMutation = useTypedMutation<number[]>(api.book.deleteMany, {
		queryKey: BOOKS_QUERY_KEY(activeProfile || ''),
		successMessage: 'Книги удалены',
		errorMessage: 'Ошибка удаления книг',
	})

	return {
		books,
		isLoading,
		error,
		refetch,

		addBook: addBookMutation.mutate,
		updateBook: updateBookMutation.mutate,
		deleteBook: deleteBookMutation.mutate,
		deleteBooks: deleteBooksMutation.mutate,

		isAdding: addBookMutation.isPending,
		isUpdating: updateBookMutation.isPending,
		isDeleting: deleteBookMutation.isPending,
		isDeletingMultiple: deleteBooksMutation.isPending,
	}
}
