import { Row } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'

import { Book } from 'src/types'
import { useSettings } from '@/hooks/useSettings'

export function RowTags({ row }: { row: Row<Book> }) {
	const { settings } = useSettings()

	const tagColors = Object.fromEntries(
		(settings?.tags || []).map((tag) => [tag.name, { bg: tag.color }]),
	)
	const tags: string[] = row.original.tags ?? []

	return (
		<div className='flex gap-1 flex-wrap'>
			{tags.map((tag) => (
				<Badge
					key={tag}
					style={{
						backgroundColor: tagColors[tag]?.bg || '#e2e8f0',
					}}
					className='select-none opacity-50 transition-opacity duration-300 hover:opacity-100'
				>
					{tag}
				</Badge>
			))}
		</div>
	)
}
