import { Settings } from './settings.schema'

export const defaultSettings: Settings = {
	general: {
		theme: 'system',
		activeProfile: '',
	},

	backups: {
		auto: true,
		interval: 1,
		max: 5,
		last: null,
	},

	table: {
		columns: [
			{
				id: 'title',
				name: 'Название',
				width: 250,
				visible: true,
				order: 0,
			},
			{
				id: 'totalVolumes',
				name: 'Т',
				width: 60,
				visible: true,
				order: 1,
			},
			{
				id: 'currentVolume',
				name: '№',
				width: 60,
				visible: true,
				order: 2,
			},
			{
				id: 'author',
				name: 'Автор',
				width: 120,
				visible: true,
				order: 3,
			},
			{
				id: 'genre',
				name: 'Жанр',
				width: 100,
				visible: true,
				order: 4,
			},
			{
				id: 'content',
				name: 'Содержание',
				width: 180,
				visible: true,
				order: 5,
			},
			{
				id: 'annotation',
				name: 'Аннотация',
				width: 200,
				visible: true,
				order: 6,
			},
			{
				id: 'year',
				name: 'Год',
				width: 80,
				visible: true,
				order: 7,
			},
			{
				id: 'tags',
				name: 'Ярлыки',
				width: 120,
				visible: true,
				order: 8,
			},
		],
		pageSize: 20,
		rowHeight: 'default',
	},

	genres: ['Жанр 1', 'Жанр 2', 'Жанр 3'],

	tags: [
		{ name: 'Избранное', color: '#FFD700' },
		{ name: 'В наличии', color: '#50C878' },
		{ name: 'Планируется', color: '#6495ED' },
	],
}
