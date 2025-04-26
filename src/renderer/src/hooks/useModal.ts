import { create } from 'zustand'

type ModalComponent = React.ComponentType<any>

interface BaseProps {
	onClose?: () => void
}

interface ModalProps extends BaseProps {
	[key: string]: any
}

export type ModalSize = 'small' | 'default' | 'fullscreen'

interface ModalState {
	isOpen: boolean
	title: string
	description?: string
	content: ModalComponent | null
	size?: ModalSize
	contentProps: ModalProps | null
	openModal: <T extends ModalComponent>(
		content: T,
		title: string,
		description?: string,
		ModalSize?: ModalSize,
		props?: React.ComponentProps<T> & ModalProps,
	) => void
	closeModal: () => void
}

const useModal = create<ModalState>((set) => ({
	isOpen: false,
	title: '',
	description: undefined,
	content: null,
	size: 'default',
	contentProps: null,
	openModal: <T extends ModalComponent>(
		content: T,
		title: string,
		description?: string,
		size: ModalSize = 'default',
		props?: Partial<React.ComponentProps<T>> & ModalProps,
	) => {
		if (!title) {
			throw new Error('Модальное окно должно содержать заголовок (title).')
		}

		set({
			isOpen: true,
			content,
			title,
			description,
			size,
			contentProps: {
				...(props ?? {}),
				onClose: () => set({ isOpen: false }),
			},
		})
	},
	closeModal: () =>
		set({
			isOpen: false,
			title: '',
			description: undefined,
			content: null,
			size: 'default',
			contentProps: null,
		}),
}))

export { useModal }
export type { ModalProps }
