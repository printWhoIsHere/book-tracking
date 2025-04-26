import { Row } from '@tanstack/react-table'
import {
	Archive,
	BookOpenText,
	MoreHorizontal,
	PenSquare,
	Trash,
} from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { BookDetailsModal, BookFormModal } from '@/components/modals'

import type { Book } from 'src/types'
import { useBooks } from '@/hooks/useBooks'
import { useModal } from '@/hooks/useModal'

export function RowActions({ row }: { row: Row<Book> }) {
	const { deleteBook } = useBooks()
	const { openModal } = useModal.getState()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel className='font-normal text-xs text-foreground/70 cursor-default select-none'>
					Actions
				</DropdownMenuLabel>

				<DropdownMenuItem
					onClick={() => {
						openModal(
							BookFormModal,
							'Изменить данные книги',
							'Введите информацию о книге',
							'default',
							{ book: row.original },
						)
					}}
				>
					<PenSquare className='mr-2 h-4 w-4' />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => {
						openModal(
							BookDetailsModal,
							'Информация о книге',
							row.original.title || '',
							'default',
							{ book: row.original },
						)
					}}
				>
					<BookOpenText className='mr-2 h-4 w-4' />
					Details
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => console.log('archive', row.original)}>
					<Archive className='mr-2 h-4 w-4' />
					Archive
				</DropdownMenuItem>
				<DropdownMenuItem
					className='text-destructive'
					onClick={() => {
						deleteBook(row.original.id)
					}}
				>
					<Trash className='mr-2 h-4 w-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
