import { z } from 'zod'
import { handleIpc } from '@main/utils'

import * as BookService from '@main/modules/book'
import { BookAddSchema, BookUpdateSchema } from './book.schema'

handleIpc('book:get', z.number(), (_, id) => BookService.getBookById(id))

handleIpc('book:getAll', null, () => BookService.getAllBooks())

handleIpc('book:search', z.string(), (_, query) =>
	BookService.searchBooks(query),
)

handleIpc('book:add', BookAddSchema, (_, data) => BookService.addNewBook(data))

handleIpc(
	'book:update',
	z.tuple([z.number(), BookUpdateSchema]),
	(_, [id, updates]) => BookService.updateBookById(id, updates),
)

handleIpc('book:delete', z.number(), (_, id) => BookService.deleteBookById(id))

handleIpc('book:deleteMany', z.array(z.number()), (_, ids) =>
	BookService.deleteMultipleBooksById(ids),
)
