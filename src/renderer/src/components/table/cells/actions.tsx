import { Row } from '@tanstack/react-table'
import { BookOpenText, MoreHorizontal, PenSquare, Trash } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { useBook } from '@/hooks/useBook'
import { useModal } from '@/hooks/useModal'
import { BookDetailsModal, BookFormModal } from '@/components/modals'

export function CellActions({ row }: { row: Row<Book> }) {
	const { deleteBook } = useBook()
	const { openModal } = useModal()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='w-full'>
				<Button variant='ghost' size='icon'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				<DropdownMenuLabel className='font-normal text-xs text-foreground/70 cursor-default select-none'>
					Actions
				</DropdownMenuLabel>

				<DropdownMenuItem
					onClick={() =>
						openModal(BookFormModal, {
							title: 'Редактировать книгу',
							props: { book: row.original },
						})
					}
				>
					<PenSquare className='mr-2 h-4 w-4' />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() =>
						openModal(BookDetailsModal, {
							title: 'Информация о книге',
							description: row.original.title || '',
							props: { book: row.original },
						})
					}
				>
					<BookOpenText className='mr-2 h-4 w-4' />
					Details
				</DropdownMenuItem>

				<DropdownMenuItem
					className='text-destructive'
					onClick={() => deleteBook(row.original.id)}
				>
					<Trash className='mr-2 h-4 w-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
