import { createColumnHelper } from '@tanstack/react-table'

import { CellActions, CellSelect, CellTags } from './cells'
import { SortableHeader } from './headers'
import { MenuHeader } from './headers/menu'
import { formatFullName } from '@/utils'

const columnHelper = createColumnHelper<Book>()

export const columns = [
	columnHelper.display({
		id: 'select',
		cell: ({ row }) => <CellSelect row={row} />,
		enableSorting: false,
		enableHiding: false,
		minSize: 60,
		maxSize: 60,
		size: 60,
	}),

	columnHelper.accessor('title', {
		header: (info) => <SortableHeader info={info} name='Название' />,
		cell: (info) => info.getValue(),
		minSize: 160,
	}),

	columnHelper.accessor('totalVolumes', {
		header: (info) => <MenuHeader info={info} name='Т' />,
		cell: (info) => info.getValue(),
		minSize: 60,
		maxSize: 60,
	}),

	columnHelper.accessor('currentVolume', {
		header: (info) => <MenuHeader info={info} name='№' />,
		cell: (info) => info.getValue(),
		minSize: 60,
		maxSize: 60,
	}),

	columnHelper.accessor(
		(row) => formatFullName(row.lastName, row.firstName, row.middleName),
		{
			id: 'author',
			header: (info) => <SortableHeader info={info} name='Автор' />,
			cell: (info) => info.getValue(),
			minSize: 160,
		},
	),

	columnHelper.accessor('genre', {
		header: (info) => <SortableHeader info={info} name='Жанр' />,
		cell: (info) => info.getValue(),
		minSize: 160,
	}),

	columnHelper.accessor('content', {
		header: (info) => <MenuHeader info={info} name='Содержание' />,
		cell: (info) => info.getValue(),
		minSize: 160,
	}),

	columnHelper.accessor('annotation', {
		header: (info) => <MenuHeader info={info} name='Аннотация' />,
		cell: (info) => info.getValue(),
		minSize: 160,
	}),

	columnHelper.accessor('year', {
		header: (info) => <MenuHeader info={info} name='Год' />,
		cell: (info) => info.getValue(),
		maxSize: 60,
		minSize: 60,
		size: 60,
	}),

	columnHelper.accessor('tags', {
		header: (info) => <MenuHeader info={info} name='Ярлыки' />,
		cell: ({ row }) => <CellTags row={row} />,
		minSize: 160,
	}),

	columnHelper.display({
		id: 'actions',
		cell: ({ row }) => <CellActions row={row} />,
		enableSorting: false,
		enableHiding: false,
		minSize: 64,
		maxSize: 64,
		size: 64,
	}),
]
