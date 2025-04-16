import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import api from '@/lib/ipc'
import type { Book } from 'src/types'

export const useBooks = () => {
	const queryClient = useQueryClient()

	// Получение всех книг
	const {
		data: books = [],
		isLoading,
		error,
	} = useQuery<Book[], Error>({
		queryKey: ['books'],
		queryFn: api.getAllBooks,
	})

	// Добавление книги
	const addBookMutation = useMutation({
		mutationFn: api.addBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	// Обновление книги
	const updateBookMutation = useMutation({
		mutationFn: ({
			id,
			field,
			value,
		}: {
			id: number
			field: keyof Book
			value: any
		}) => api.updateBook(id, field, value),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	// Удаление книги
	const removeBookMutation = useMutation({
		mutationFn: api.removeBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	return {
		books,
		isLoading,
		error,
		addBook: addBookMutation.mutate,
		updateBook: updateBookMutation.mutate,
		removeBook: removeBookMutation.mutate,
		isAdding: addBookMutation.isPending,
		isUpdating: updateBookMutation.isPending,
		isRemoving: removeBookMutation.isPending,
	}
}
