/// <reference types="vite/client" />

type Book = {
	id: number
	tags: string[]
	title?: string | null | undefined
	totalVolumes?: number | null | undefined
	currentVolume?: number | null | undefined
	lastName?: string | null | undefined
	firstName?: string | null | undefined
	middleName?: string | null | undefined
	genre?: string | null | undefined
	content?: string | null | undefined
	annotation?: string | null | undefined
	year?: number | null | undefined
	tags?: string[] | null | undefined
}

type Settings = {
	general: {
		theme: 'light' | 'dark' | 'system'
		activeProfile: string
	}
	backups: {
		auto: boolean
		interval: number
		max: number
		last: string | null
	}
	table: {
		columns: string[]
		pageSize: number
		rowHeight: 'compact' | 'default' | 'comfortable'
	}
	genres: string[]
	tags: Tag[]
}

interface Tag {
	name: string
	color: string
}

interface ModalProps {
	onClose: () => void
}
