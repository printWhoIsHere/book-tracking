import { API } from 'preload/index.d'

const createApiMethod = <T extends (...args: any[]) => Promise<unknown>>(
	fn: T,
): T => fn

const api: API = {
	book: {
		get: createApiMethod(window.api.book.get),
		getAll: createApiMethod(window.api.book.getAll),
		add: createApiMethod(window.api.book.add),
		update: createApiMethod(window.api.book.update),
		delete: createApiMethod(window.api.book.delete),
		deleteMany: createApiMethod(window.api.book.deleteMany),
	},

	backup: {
		list: createApiMethod(window.api.backup.list),
		create: createApiMethod(window.api.backup.create),
		restore: createApiMethod(window.api.backup.restore),
		delete: createApiMethod(window.api.backup.delete),
	},

	profile: {
		getActive: createApiMethod(window.api.profile.getActive),
		list: createApiMethod(window.api.profile.list),
		add: createApiMethod(window.api.profile.add),
		delete: createApiMethod(window.api.profile.delete),
		switch: createApiMethod(window.api.profile.switch),
		rename: createApiMethod(window.api.profile.rename),
	},

	settings: {
		get: createApiMethod(window.api.settings.get),
		set: createApiMethod(window.api.settings.set),
		reset: createApiMethod(window.api.settings.reset),
	},

	import: {
		booksFromExcel: createApiMethod(window.api.import.booksFromExcel),
	},

	export: {
		booksToExcel: createApiMethod(window.api.export.booksToExcel),
	},
}

export default api
