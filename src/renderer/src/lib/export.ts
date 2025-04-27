import { toast } from '@/hooks/useToast'
import api from './ipc'

export async function exportBooks() {
	try {
		const filePath = await api.export.booksToExcel()
		return filePath
	} catch (error) {
		toast({
			description: 'Ошибка экспорта книг: ' + error,
			variant: 'destructive',
		})
		throw error
	}
}
