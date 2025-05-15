import { toast } from '@/hooks/useToast'
import api from './ipc'

export async function exportBooks() {
	try {
		const filePath = await api.export.booksToExcel()
		console.log(filePath)
		toast({
			description: `Экспорт выполнен: ${String(filePath)}`,
			variant: 'default',
		})

		return filePath
	} catch (error: any) {
		toast({
			description: 'Ошибка экспорта книг: ' + (error?.message || String(error)),
			variant: 'destructive',
		})
		throw error
	}
}
