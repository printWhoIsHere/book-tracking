import { useQuery } from '@tanstack/react-query'
import api from '../lib/ipc'
import type { Book } from 'src/types'

export const useBook = (id: number) => {
	const {
		data: book,
		isLoading,
		error,
	} = useQuery<Book | undefined, Error>({
		queryKey: ['book', id],
		queryFn: () => api.getBookById(id),
		enabled: !!id, // Запрос выполняется только если id существует
	})

	return {
		book,
		isLoading,
		error,
	}
}
