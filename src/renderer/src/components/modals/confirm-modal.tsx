import { ModalProps } from '@/hooks/useModal'
import { Button } from '@/components/ui/button'

interface ConfirmModal extends ModalProps {
	onConfirm: () => void
	message: string
}

export function ConfirmModal({ onConfirm, message, onClose }: ConfirmModal) {
	return (
		<div className='space-y-4'>
			<p>{message}</p>
			<div className='flex justify-end gap-2'>
				<Button variant='outline' onClick={onClose}>
					Cancel
				</Button>
				<Button
					variant='destructive'
					onClick={() => {
						onConfirm()
						onClose?.()
					}}
				>
					Confirm
				</Button>
			</div>
		</div>
	)
}
