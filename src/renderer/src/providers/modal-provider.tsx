import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModal'
import { cn } from '@/lib/utils'

export function ModalProvider() {
	const {
		isOpen,
		title,
		description,
		content: Content,
		contentProps,
		size,
		closeModal,
	} = useModal()

	if (!Content) return null

	const sizeClasses = {
		small: 'max-w-sm',
		default: 'min-w-[760px] min-h-[420px] max-h-[90vh] max-w-2xl',
		fullscreen: 'w-[90vw] h-[90vh] sm:w-[70vw] sm:h-[70vh]',
	}

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent
				className={cn(
					'flex flex-col rounded-2xl',
					sizeClasses[size ?? 'default'],
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>

				<div className='h-full flex-1 overflow-auto mt-4 p-1'>
					<Content {...contentProps} />
				</div>
			</DialogContent>
		</Dialog>
	)
}
