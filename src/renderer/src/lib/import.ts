import { toast } from '@/hooks/useToast'
import api from './ipc'

export async function importBooks(formData: FormData) {
	try {
		const uploadedFile = formData.get('file') as File

		if (!uploadedFile) {
			throw new Error('Файл не найден в FormData')
		}

		console.log(uploadedFile.path)

		return await api.import.booksFromExcel(uploadedFile.path)
	} catch (error) {
		toast({
			description: 'Ошибка импорта книг: ' + error,
			variant: 'destructive',
		})
		throw error
	}
}
