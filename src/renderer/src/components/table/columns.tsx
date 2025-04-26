import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { RowSelect, RowTags, RowActions } from '@/components/table/rows'

import { Book } from 'src/types'
import { formatFullName } from '@/lib/utils'

export function getColumns(hidden: string[]): ColumnDef<Book>[] {
	const baseColumns: (ColumnDef<Book> | false)[] = [
		{
			id: 'select',
			cell: ({ row }) => <RowSelect row={row} />,
			enableSorting: false,
			enableHiding: false,
		},

		!hidden.includes('title') && {
			id: 'title',
			accessorKey: 'title',
			header: ({ column }) => (
				<Button
					variant='ghost'
					className='hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Название
					<ArrowUpDown />
				</Button>
			),
		},

		!hidden.includes('totalVolumes') && {
			id: 'totalVolumes',
			accessorKey: 'totalVolumes',
			header: 'Т',
			size: 10,
		},

		!hidden.includes('currentVolume') && {
			id: 'currentVolume',
			accessorKey: 'currentVolume',
			header: '№',
			size: 10,
		},

		// TODO: Определить как скрывать поле по ФИО
		!hidden.includes('author') && {
			id: 'author',
			accessorFn: (row) =>
				formatFullName(row.lastName, row.firstName, row.middleName),
			header: ({ column }) => (
				<Button
					variant='ghost'
					className='hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Автор
					<ArrowUpDown />
				</Button>
			),
		},

		!hidden.includes('genre') && {
			id: 'genre',
			accessorKey: 'genre',
			header: 'Жанр',
		},

		!hidden.includes('content') && {
			id: 'content',
			accessorKey: 'content',
			header: 'Содержание',
		},

		!hidden.includes('annotation') && {
			id: 'annotation',
			accessorKey: 'annotation',
			header: 'Аннотация',
		},

		!hidden.includes('year') && {
			id: 'year',
			accessorKey: 'year',
			header: 'Год',
		},

		!hidden.includes('tags') && {
			id: 'tags',
			accessorKey: 'tags',
			header: 'Ярлыки',
			cell: ({ row }) => <RowTags row={row} />,
		},

		{
			id: 'actions',
			cell: ({ row }) => <RowActions row={row} />,
		},
	]

	return baseColumns.filter(Boolean) as ColumnDef<Book>[]
}
