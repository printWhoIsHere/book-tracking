import { Cell, flexRender } from '@tanstack/react-table'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/utils'
import { useSettings } from '@/hooks/useSettings'

export function DefaultCell<TData>({ cell }: { cell: Cell<TData, unknown> }) {
	const { settings } = useSettings()
	const lines = settings.table.rowHeight === 'comfortable' ? 3 : 1

	const multilineStyle =
		lines > 1
			? {
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical' as const,
					WebkitLineClamp: lines,
					overflow: 'hidden',
				}
			: {}

	return (
		<TableCell
			key={cell.id}
			className={cn('p-0')}
			style={{
				width: cell.column.getSize(),
				minWidth: cell.column.columnDef.minSize ?? 60,
				flex: `0 0 ${cell.column.getSize()}px`,
			}}
		>
			<div
				className={cn(
					'block align-middle max-w-full px-3 overflow-hidden',
					lines === 1 ? 'whitespace-nowrap text-ellipsis' : 'whitespace-normal',
				)}
				style={multilineStyle}
				title={String(cell.getValue())}
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</div>
		</TableCell>
	)
}
