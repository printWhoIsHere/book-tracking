import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

import { cn, getTagColor } from '@/utils'
import { useSettings } from '@/hooks/useSettings'

interface BadgeMoreProps {
	tags: string[]
	className?: string
}

export function BadgeMore({ tags, className }: BadgeMoreProps) {
	const { settings } = useSettings()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button>
					<Badge variant='outline' className={cn('cursor-pointer', className)}>
						+{tags.length}
					</Badge>
				</button>
			</PopoverTrigger>
			<PopoverContent
				sideOffset={4}
				className='p-2 bg-popover w-auto shadow-lg border rounded-sm z-50'
			>
				<div className='flex flex-col gap-1 justify-start'>
					{tags.map((tag) => (
						<Badge
							key={tag}
							style={{
								backgroundColor: getTagColor(tag, settings),
							}}
						>
							{tag}
						</Badge>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
