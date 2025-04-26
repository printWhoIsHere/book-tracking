import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import api from '@/lib/ipc'
import { useToast } from '@/hooks/useToast'

import { Book } from 'src/types'

export const useBooks = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const {
		data: books = [],
		isLoading,
		error,
	} = useQuery<Book[], Error>({
		queryKey: ['books'],
		queryFn: api.book.getAll,
	})

	const addBookMutation = useMutation({
		mutationFn: api.book.add,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
			toast({ description: 'Книга добавлена', variant: 'success' })
		},
		onError: () => {
			toast({ description: 'Ошибка добавления книги', variant: 'destructive' })
		},
	})

	const updateBookMutation = useMutation({
		mutationFn: ({ id, updates }: { id: number; updates: Partial<Book> }) =>
			api.book.update(id, updates),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
			toast({ description: 'Книга обновлена', variant: 'success' })
		},
		onError: () => {
			toast({ description: 'Ошибка обновления книги', variant: 'destructive' })
		},
	})

	const deleteBookMutation = useMutation({
		mutationFn: api.book.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
			toast({ description: 'Книга удалена', variant: 'warning' })
		},
		onError: () => {
			toast({ description: 'Ошибка удаления книги', variant: 'destructive' })
		},
	})

	const deleteBooksMutation = useMutation({
		mutationFn: api.book.deleteMultiple,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
			toast({ description: 'Книги удалены', variant: 'success' })
		},
		onError: () => {
			toast({ description: 'Ошибка удаления книг', variant: 'destructive' })
		},
	})

	return {
		books,
		isLoading,
		error,

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
