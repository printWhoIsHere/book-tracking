import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { TablePagination } from '@/components/table/table-pagination'
import { ConfirmModal } from '@/components/modals/confirm-modal'

import { Book } from 'src/types'
import { cn } from '@/lib/utils'
import { useBooks } from '@/hooks/useBooks'
import { useSettings } from '@/hooks/useSettings'
import { useModal } from '@/hooks/useModal'
import { BookDetailsModal } from '../modals'

interface DataTableProps<TData, TValue> {
	data: TData[]
	columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
	data,
	columns,
}: DataTableProps<TData, TValue>) {
	const { openModal } = useModal()
	const { deleteBooks } = useBooks()
	const { settings } = useSettings()

	const pageSize = settings?.table?.pageSize || 25
	const rowHeight = settings?.table?.rowHeight || 'compact'

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize,
			},
		},
		enableRowSelection: true,
	})

	const hasSelectedRows = table.getSelectedRowModel().rows.length > 0

	return (
		<div className='space-y-4'>
			<div className='rounded-md border overflow-x-auto'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const isResizing = header.column.getIsResizing()
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												width: header.getSize(),
												position: 'relative',
											}}
											className={cn(
												'group relative',
												isResizing && 'border-blue-500',
											)}
										>
											{header.isPlaceholder ? null : (
												<div
													className='flex items-center justify-between'
													style={{ width: '100%' }}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													{/* Ресайзер */}
													{header.column.getCanResize() && (
														<div
															onMouseDown={header.getResizeHandler()}
															onTouchStart={header.getResizeHandler()}
															className='resizer'
														/>
													)}
												</div>
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className={cn(
										rowHeight === 'compact' && 'h-8',
										rowHeight === 'default' && 'h-12',
										rowHeight === 'comfortable' && 'h-16',
									)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{ width: cell.column.getSize() }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Нет данных
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center'>
				{hasSelectedRows && (
					<Button
						variant='destructive'
						size='sm'
						onClick={() => {
							openModal(
								ConfirmModal,
								'Подтверждение',
								'Вы уверены, что хотите удалить выбранные книги?',
								'small',
								{
									onConfirm: () => {
										deleteBooks(
											table
												.getSelectedRowModel()
												.rows.map((r) => (r.original as Book).id),
										)
									},
								},
							)
						}}
					>
						Delete
					</Button>
				)}
				<div className='ml-auto'>
					<TablePagination table={table} />
				</div>
			</div>
		</div>
	)
}
