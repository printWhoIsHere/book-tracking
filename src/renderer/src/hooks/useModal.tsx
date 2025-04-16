import { create } from 'zustand'

interface ModalProps {
	onClose?: () => void
	[key: string]: any
}

interface ModalState {
	isOpen: boolean
	title: string
	description?: string
	content: React.ComponentType<ModalProps> | null
	contentProps: ModalProps | null
	openModal: (
		content: React.ComponentType<ModalProps>,
		title: string,
		description?: string,
		props?: ModalProps,
	) => void
	closeModal: () => void
}

const useModal = create<ModalState>((set) => ({
	isOpen: false,
	title: '',
	description: undefined,
	content: null,
	contentProps: null,
	openModal: (content, title, description, props = {}) =>
		set({
			isOpen: true,
			content,
			title,
			description,
			contentProps: { ...props, onClose: () => set({ isOpen: false }) },
		}),
	closeModal: () =>
		set({
			isOpen: false,
			content: null,
			title: '',
			description: undefined,
			contentProps: null,
		}),
}))

export { useModal, type ModalProps }
