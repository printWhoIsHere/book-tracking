import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModal'
import { cn } from '@/utils'

export function ModalProvider() {
	const { isOpen, title, description, Component, props, closeModal } =
		useModal()

	if (!Component) return null

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent
				className={cn('flex flex-col rounded-2xl sm:max-w-[625px]')}
			>
				<DialogHeader className='mb-2'>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>

				<Component {...props} onClose={closeModal} />
			</DialogContent>
		</Dialog>
	)
}
