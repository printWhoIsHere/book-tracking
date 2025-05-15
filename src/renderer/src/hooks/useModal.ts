import { create } from 'zustand'

export type ModalComponent<P extends ModalProps = ModalProps> =
	React.ComponentType<P>

interface ModalState {
	isOpen: boolean
	title: string
	description?: string
	Component?: ModalComponent<any>
	props: ModalProps
	openModal: <T extends ModalProps>(
		Component: ModalComponent<T>,
		options: {
			title: string
			description?: string
			props?: Omit<T, 'onClose'>
		},
	) => void
	closeModal: () => void
}

const useModal = create<ModalState>((set) => ({
	isOpen: false,
	title: '',
	description: undefined,
	Component: undefined,
	props: {} as any,
	openModal: (Component, { title, description, props = {} }) => {
		if (!title) throw new Error('Modal must have a title')

		set({
			isOpen: true,
			Component,
			title,
			description,
			props: {
				...props,
				onClose: () => useModal.getState().closeModal(),
			},
		})
	},
	closeModal: () =>
		set({
			isOpen: false,
			title: '',
			description: undefined,
			Component: undefined,
			props: {} as any,
		}),
}))

export { useModal }
