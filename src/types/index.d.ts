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
	tags?: string
}

interface Tag {
	name: string
	color: string
}

interface Settings {
	app: {
		theme: 'light' | 'dark'
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
		rowHeight: 'compact' | 'standard'
	}
	genres: string[]
	tags: Tag[]
}

export { Book, Tags, Settings }
