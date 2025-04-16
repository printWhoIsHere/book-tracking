import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModalProps } from '@/hooks/useModal'

interface AddBookFormData {
	title: string
	author: string
}

interface AddBookModalProps extends ModalProps {
	onSubmit?: (data: AddBookFormData) => void
}

export default function AddBookModal({ onSubmit, onClose }: AddBookModalProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			title: formData.get('title') as string,
			author: formData.get('author') as string,
		}
		onSubmit?.(data)
		onClose?.()
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label htmlFor='title' className='block text-sm font-medium'>
					Название книги
				</label>
				<Input id='title' name='title' required />
			</div>
			<div>
				<label htmlFor='author' className='block text-sm font-medium'>
					Автор
				</label>
				<Input id='author' name='author' required />
			</div>
			<div className='flex justify-end space-x-2'>
				<Button type='button' variant='outline' onClick={onClose}>
					Отмена
				</Button>
				<Button type='submit'>Добавить</Button>
			</div>
		</form>
	)
}
