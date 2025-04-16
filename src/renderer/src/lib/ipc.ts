const api = {
	getAllBooks: () => window.api.getAllBooks(),
	getBookById: (id) => window.api.getBookById(id),
	addBook: (book) => window.api.addBook(book),
	updateBook: (id, field, value) => window.api.updateBook(id, field, value),
	removeBook: (id) => window.api.removeBook(id),

	getSettings: () => window.api.getSettings(),
	updateSettings: (settings) => window.api.updateSettings(settings),
}

export default api
