import { Button } from '@/components/ui/button'

interface ConfirmModalProps extends ModalProps {
	message: string
	onConfirm: () => void
}

export function ConfirmModal({
	message,
	onConfirm,
	onClose,
}: ConfirmModalProps) {
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
						onClose()
					}}
				>
					Confirm
				</Button>
			</div>
		</div>
	)
}
