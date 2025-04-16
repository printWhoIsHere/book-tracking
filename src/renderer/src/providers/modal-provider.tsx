import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/useModal'

export function ModalProvider() {
	const {
		isOpen,
		title,
		description,
		content: Content,
		contentProps,
		closeModal,
	} = useModal()

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{Content && <Content {...contentProps} />}
			</DialogContent>
		</Dialog>
	)
}
