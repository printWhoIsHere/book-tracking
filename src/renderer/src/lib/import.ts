import { toast } from '@/hooks/useToast'
import api from './ipc'

export async function importBooks({
	filePath,
	profileName,
	createNewProfile = false,
}: {
	filePath: string
	profileName?: string
	createNewProfile?: boolean
}) {
	try {
		const count = await api.import.booksFromExcel({
			filePath,
			profileName,
			createNewProfile,
		})

		toast({
			description: `Импортировано книг: ${count}`,
		})

		return count
	} catch (error) {
		toast({
			description: 'Ошибка импорта книг: ' + error,
			variant: 'destructive',
		})
		throw error
	}
}
