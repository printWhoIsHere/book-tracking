import { useRef } from 'react'
import { Row } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { BadgeMore } from '@/components/badge-more'

import { getTagColor } from '@/utils'
import { useSettings } from '@/hooks/useSettings'
import { useVisibleTags } from '@/hooks/useVisibleTags'

export function CellTags({ row }: { row: Row<Book> }) {
	const { settings } = useSettings()
	const tags = row.original.tags ?? []
	const rowHeight = settings.table.rowHeight
	const containerRef = useRef<HTMLDivElement>(null)

	const { visible, hidden } = useVisibleTags(tags, containerRef, rowHeight)

	console.log('visible', visible, 'hidden', hidden)

	if (rowHeight === 'compact') {
		return tags.length === 0 ? null : <BadgeMore tags={tags} />
	}

	const maxHeight = rowHeight === 'comfortable' ? 64 : 24

	return (
		<div
			ref={containerRef}
			className='flex flex-wrap items-center gap-1 overflow-hidden w-full'
			style={{ maxHeight }}
		>
			{visible.map((tag) => (
				<Badge
					key={tag}
					className='opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default flex-shrink-0'
					style={{ backgroundColor: getTagColor(tag, settings) }}
				>
					{tag}
				</Badge>
			))}
			{hidden.length > 0 && <BadgeMore tags={hidden} />}
		</div>
	)
}
