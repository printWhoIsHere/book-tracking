import { existsSync, writeFileSync } from 'fs'
import { settingsPath } from './config'

const createSettings = () => ({
	general: {
		theme: 'dark',
		defaultView: 'home',
	},
	backups: {
		autoBackup: true,
		backupInterval: 7,
		maxBackups: 10,
		lastBackup: null,
	},
	table: {
		columnOrder: [
			'title',
			'totalVolumes',
			'currentVolume',
			'lastName',
			'firstName',
			'middleName',
			'genre',
			'content',
			'annotation',
			'year',
			'tags',
		],
		pageSize: 25,
		rowHeight: 'default',
	},
	genres: ['Фантастика', 'Детектив', 'Роман', 'Научная литература'],
	tags: [
		{ name: 'Избранное', color: '#FFD700' },
		{ name: 'В наличии', color: '#50C878' },
		{ name: 'Прочитано', color: '#6495ED' },
	],
})

if (!existsSync(settingsPath)) {
	writeFileSync(
		settingsPath,
		JSON.stringify(createSettings(), null, 2),
		'utf-8',
	)
}
