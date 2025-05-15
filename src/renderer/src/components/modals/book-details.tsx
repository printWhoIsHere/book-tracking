import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { useSettings } from '@/hooks/useSettings'
import { formatVolumes, getTagColor } from '@/utils'
import { ScrollArea } from '../ui/scroll-area'

interface BookDetailsProps extends ModalProps {
	book: Book
}

export function BookDetailsModal({ book, onClose }: BookDetailsProps) {
	const { settings } = useSettings()

	return (
		<ScrollArea className='space-y-4 p-4 pr-8 h-[400px] w-[400px]'>
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-lg font-semibold'>{book.title}</h2>
					<p className='text-sm text-muted-foreground'>
						{book.firstName} {book.middleName} {book.lastName}
					</p>
				</div>

				<Button
					variant='ghost'
					size='sm'
					onClick={onClose}
					className='text-sm text-muted-foreground'
				>
					Закрыть
				</Button>
			</div>

			<Separator className='my-2' />

			<div className='space-y-4'>
				<div>
					<p className='text-sm text-muted-foreground'>Аннотация</p>
					<p>{book.annotation || '—'}</p>
				</div>

				<div>
					<p className='text-sm text-muted-foreground'>Содержание</p>
					<p>{book.content || '—'}</p>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<p className='text-sm text-muted-foreground'>Жанр</p>
						<p>{book.genre || '—'}</p>
					</div>

					<div>
						<p className='text-sm text-muted-foreground'>Год</p>
						<p>{book.year || '—'}</p>
					</div>

					<div>
						<p className='text-sm text-muted-foreground'>Том</p>
						<p>{formatVolumes(book.currentVolume, book.totalVolumes)}</p>
					</div>
				</div>

				<div>
					<p className='text-sm text-muted-foreground mb-1'>Теги</p>
					<div className='flex flex-wrap gap-2'>
						{book.tags.length ? (
							book.tags.map((tag) => (
								<Badge
									key={tag}
									className='opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default'
									style={{ backgroundColor: getTagColor(tag, settings) }}
								>
									{tag}
								</Badge>
							))
						) : (
							<p>—</p>
						)}
					</div>
				</div>
			</div>
		</ScrollArea>
	)
}
