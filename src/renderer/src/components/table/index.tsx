import { useEffect, useMemo, useRef, useState } from 'react'
import {
	ColumnDef,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	PaginationState,
	getPaginationRowModel,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { TablePagination } from '@/components/table/pagination'
import { DefaultHeader } from '@/components/table/headers'
import { DefaultCell } from '@/components/table/cells'

import { useSettings } from '@/hooks/useSettings'
import { useTableContext } from '@/providers/table-provider'

interface DataTableProps<TData> {
	data: TData[]
	columns: ColumnDef<TData, any>[]
}

export function DataTable<TData>({ data, columns }: DataTableProps<TData>) {
	const { settings } = useSettings()
	const { setSelectedRows } = useTableContext()

	const [sorting, setSorting] = useState<SortingState>([])

	const tableContainerRef = useRef<HTMLDivElement>(null)
	const outerContainerRef = useRef<HTMLDivElement>(null)

	const effectivePageSize = useMemo(
		() =>
			settings.table.pageSize === 0 ? data.length : settings.table.pageSize,
		[settings.table.pageSize, data.length],
	)

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: effectivePageSize,
	})

	useEffect(() => {
		setPagination({
			pageIndex: 0,
			pageSize: effectivePageSize,
		})
	}, [effectivePageSize])

	const rowHeight = useMemo(() => {
		switch (settings.table.rowHeight) {
			case 'compact':
				return 40
			case 'comfortable':
				return 104
			default:
				return 52
		}
	}, [settings.table.rowHeight])

	const table = useReactTable<TData>({
		data,
		columns,
		columnResizeMode: 'onChange',
		columnResizeDirection: 'ltr',
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		enableColumnResizing: true,
		initialState: {
			pagination: {
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
		},
		state: {
			sorting,
			pagination,
		},
	})

	useEffect(() => {
		const selectedIds = table
			.getSelectedRowModel()
			.rows.map((r) => (r.original as Book).id)

		setSelectedRows(selectedIds)
	}, [table.getSelectedRowModel().rows, setSelectedRows])

	const { rows } = table.getRowModel()
	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => rowHeight,
		overscan: 10,
	})
	const virtualRows = rowVirtualizer.getVirtualItems()

	useEffect(() => {
		rowVirtualizer.measure()
	}, [rowHeight, rowVirtualizer])

	const totalTableWidth = useMemo(() => {
		return table.getTotalSize()
	}, [table.getState().columnSizing])

	const tableProps = {
		style: {
			minWidth: `${totalTableWidth}px`,
			width: '100%',
			tableLayout: 'fixed' as const,
		},
	}

	return (
		<>
			<div
				className='flex flex-col border border-border rounded-sm overflow-hidden'
				style={{ width: '100%' }}
			>
				<div ref={outerContainerRef} className='overflow-x-auto'>
					<div style={{ minWidth: totalTableWidth, width: '100%' }}>
						{/* Header */}
						<div className='overflow-hidden'>
							<Table {...tableProps}>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id} className='flex w-full'>
											{headerGroup.headers.map((header) => (
												<DefaultHeader key={header.column.id} header={header} />
											))}
										</TableRow>
									))}
								</TableHeader>
							</Table>
						</div>

						{/* Body */}
						<div
							ref={tableContainerRef}
							className='overflow-y-auto overflow-x-hidden'
							style={{ maxHeight: '600px' }}
							onWheel={(e) => {
								if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
									e.stopPropagation()
									outerContainerRef.current?.scrollLeft &&
										(outerContainerRef.current.scrollLeft += e.deltaX)
								}
							}}
						>
							<Table {...tableProps}>
								<TableBody
									style={{
										height: `${rowVirtualizer.getTotalSize()}px`,
										position: 'relative',
									}}
								>
									{virtualRows.map((virtualItem) => {
										const row = rows[virtualItem.index]
										return (
											<TableRow
												key={virtualItem.key}
												className='absolute top-0 left-0 flex w-full items-center'
												style={{
													height: `${virtualItem.size}px`,
													transform: `translateY(${virtualItem.start}px)`,
												}}
												data-state={row.getIsSelected() && 'selected'}
											>
												{row.getVisibleCells().map((cell) => (
													<DefaultCell key={cell.id} cell={cell} />
												))}
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full flex items-center justify-end mt-4'>
				<TablePagination table={table} />
			</div>
		</>
	)
}
