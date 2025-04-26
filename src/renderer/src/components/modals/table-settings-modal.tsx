import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectLabel,
	SelectSeparator,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { ModalProps } from '@/hooks/useModal'
import { useSettings } from '@/hooks/useSettings'
import { useState, useEffect } from 'react'
import { Settings } from 'src/types'

export function TableSettingsModal({ onClose }: ModalProps) {
	const { settings, updateSettings } = useSettings()

	const [hiddenColumns, setHiddenColumns] = useState<
		Settings['table']['hiddenColumns']
	>(settings?.table.hiddenColumns || [])
	const [pageSize, setPageSize] = useState<Settings['table']['pageSize']>(
		settings?.table.pageSize || 25,
	)
	const [rowHeight, setRowHeight] = useState<Settings['table']['rowHeight']>(
		settings?.table.rowHeight || 'default',
	)

	const handleColumnVisibility = (column: string) => {
		setHiddenColumns((prev) => {
			if (prev.includes(column)) {
				const updatedColumns = prev.filter((col) => col !== column)
				return updatedColumns
			} else {
				return [...prev, column]
			}
		})
	}

	const handlePageSizeChange = (size: string) => {
		setPageSize(parseInt(size, 10))
	}

	const handleRowHeightChange = (height: Settings['table']['rowHeight']) => {
		setRowHeight(height)
	}

	const handleSave = () => {
		if (settings) {
			updateSettings({
				...settings,
				table: {
					...settings.table,
					hiddenColumns,
					pageSize,
					rowHeight,
				},
			})
		}
	}

	useEffect(() => {
		setHiddenColumns(settings?.table.hiddenColumns || [])
		setPageSize(settings?.table.pageSize || 25)
		setRowHeight(settings?.table.rowHeight || 'default')
	}, [settings])

	return (
		<div className='space-y-5'>
			<Label className='text-muted-foreground'>Column visible</Label>
			<ToggleGroup className='grid grid-cols-3' type='multiple'>
				{settings?.table.columnOrder.map((column) => (
					<ToggleGroupItem
						key={column}
						value={column}
						aria-label={column}
						data-state={hiddenColumns.includes(column) ? 'on' : 'off'}
						onClick={() => handleColumnVisibility(column)}
					>
						{column}
					</ToggleGroupItem>
				))}
			</ToggleGroup>

			<Separator />

			<div className='grid grid-cols-2 gap-2'>
				<Select
					value={pageSize.toString()}
					onValueChange={handlePageSizeChange}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select a page size' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Page size</SelectLabel>
							<SelectSeparator />
							<SelectItem value='5'>5</SelectItem>
							<SelectItem value='25'>25</SelectItem>
							<SelectItem value='50'>50</SelectItem>
							<SelectItem value='100'>100</SelectItem>
							<SelectItem value='200'>200</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select value={rowHeight} onValueChange={handleRowHeightChange}>
					<SelectTrigger>
						<SelectValue placeholder='Select a row height' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Row height</SelectLabel>
							<SelectSeparator />
							<SelectItem value='compact'>Compact</SelectItem>
							<SelectItem value='default'>Default</SelectItem>
							<SelectItem value='comfortable'>Comfortable</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className='w-full flex justify-end'>
				<Button variant='ghost' onClick={onClose}>
					Вернуться
				</Button>
				<Button
					className='ml-2'
					onClick={handleSave}
					disabled={
						!hiddenColumns.length && pageSize === 25 && rowHeight === 'default'
					}
				>
					Сохранить
				</Button>
			</div>
		</div>
	)
}
