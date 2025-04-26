interface Book {
	id: number
	title?: string
	totalVolumes?: number
	currentVolume?: number
	lastName?: string
	firstName?: string
	middleName?: string
	genre?: string
	content?: string
	annotation?: string
	year?: number
	tags?: string[]
	isArchived?: boolean
}

interface Tag {
	name: string
	color: string
}

interface Settings {
	general: {
		theme: 'light' | 'dark' | 'system'
		defaultView: 'home' | 'table' | 'authors'
	}
	backups: {
		autoBackup: boolean
		backupInterval: number
		maxBackups: number
		lastBackup: string | null
	}
	table: {
		columnOrder: string[]
		hiddenColumns: string[]
		pageSize: number
		rowHeight: 'compact' | 'default' | 'comfortable'
	}
	profiles: { name: string; quantity: number }[]
	genres: string[]
	tags: Tag[]
}

export { Book, Tag, Settings }
