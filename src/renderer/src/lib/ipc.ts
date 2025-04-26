import { API } from 'src/preload/index.d'

const api: API = {
	book: {
		get: (id) => window.api.book.get(id),
		getAll: () => window.api.book.getAll(),
		add: (book) => window.api.book.add(book),
		update: (id, updates) => window.api.book.update(id, updates),
		delete: (id) => window.api.book.delete(id),
		deleteMultiple: (ids) => window.api.book.deleteMultiple(ids),
		archive: (id) => window.api.book.archive(id),
		unarchive: (id) => window.api.book.unarchive(id),
	},

	settings: {
		get: () => window.api.settings.get(),
		update: (settings) => window.api.settings.update(settings),
	},

	backup: {
		create: () => window.api.backup.create(),
		list: () => window.api.backup.list(),
		restore: (backupFileName) => window.api.backup.restore(backupFileName),
		delete: (backupFileName) => window.api.backup.delete(backupFileName),
	},

	export: {
		booksToExcel: () => window.api.export.booksToExcel(),
	},
}

export default api
