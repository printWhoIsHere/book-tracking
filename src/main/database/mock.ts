import type { Database as DatabaseType } from 'better-sqlite3'
import type { BookAdd } from '@main/modules/book'

export function insertMockBooks(db: DatabaseType): void {
	const row = db.prepare('SELECT COUNT(*) as count FROM books').get() as {
		count: number
	}

	if (row.count === 0) {
		const mockBook: BookAdd = {
			title: 'Example Title',
			totalVolumes: 5,
			currentVolume: 2,
			lastName: 'Doe',
			firstName: 'John',
			middleName: 'M',
			genre: 'Fiction',
			content: 'This is a book content.',
			annotation: 'A brief description of the book.',
			year: 2023,
			tags: ['Избранное', 'В наличии'],
		}

		const mockBookSerialized = {
			...mockBook,
			tags: JSON.stringify(mockBook.tags),
		}

		db.prepare(
			`INSERT INTO books (
				title, totalVolumes, currentVolume,
				lastName, firstName, middleName,
				genre, content, annotation, year, tags
			) VALUES (
				@title, @totalVolumes, @currentVolume,
				@lastName, @firstName, @middleName,
				@genre, @content, @annotation, @year, @tags
			);`,
		).run(mockBookSerialized)
	}
}
