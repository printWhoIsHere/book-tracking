import { Button } from '@/components/ui/button'

import type { Book } from 'src/types'
import { ModalProps } from '@/hooks/useModal'

interface BookDetailsModalProps extends ModalProps {
	book: Book
}

export function BookDetailsModal({ book, onClose }: BookDetailsModalProps) {
	console.log(book)

	return (
		<div className='space-y-5'>
			<>Book Details</>

			<div className='w-full flex justify-end'>
				<Button variant='ghost' onClick={onClose}>
					Вернуться
				</Button>
			</div>
		</div>
	)
}
