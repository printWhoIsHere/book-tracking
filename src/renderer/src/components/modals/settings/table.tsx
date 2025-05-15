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
import { Button } from '@/components/ui/button'

import { useSettings } from '@/hooks/useSettings'
import { useState, useEffect } from 'react'

export function TableSettingsModal({ onClose }: ModalProps) {
	const { settings, setSettings } = useSettings()

	const [pageSize, setPageSize] = useState<Settings['table']['pageSize']>(
		settings.table.pageSize,
	)
	const [rowHeight, setRowHeight] =
		useState<Settings['table']['rowHeight']>('default')

	useEffect(() => {
		setPageSize(settings.table.pageSize)
		setRowHeight(settings.table.rowHeight)
	}, [settings])

	const handlePageSizeChange = (value: string) => {
		setPageSize(parseInt(value, 10))
	}

	const handleRowHeightChange = (value: string) => {
		setRowHeight(value as Settings['table']['rowHeight'])
	}

	const handleSave = () => {
		setSettings({
			...settings,
			table: {
				...settings.table,
				pageSize,
				rowHeight,
			},
		})
		onClose()
	}

	return (
		<div className='space-y-5'>
			<div className='grid grid-cols-2 gap-2'>
				<Select
					value={pageSize.toString()}
					onValueChange={handlePageSizeChange}
				>
					<SelectTrigger className='w-[200px]'>
						<SelectValue placeholder='Select a page size'>
							{pageSize === 0 ? 'All' : pageSize}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Page size</SelectLabel>
							<SelectSeparator />
							<SelectItem value='0'>All</SelectItem>
							<SelectItem value='5'>5</SelectItem>
							<SelectItem value='25'>25</SelectItem>
							<SelectItem value='50'>50</SelectItem>
							<SelectItem value='100'>100</SelectItem>
							<SelectItem value='200'>200</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select value={rowHeight} onValueChange={handleRowHeightChange}>
					<SelectTrigger className='w-[200px]'>
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

			<div className='flex justify-end space-x-2'>
				<Button variant='ghost' onClick={onClose}>
					Отмена
				</Button>
				<Button onClick={handleSave}>Сохранить</Button>
			</div>
		</div>
	)
}
