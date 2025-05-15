import { z } from 'zod'
const BookSchema = z.object({
	id: z.number(),
	title: z.string().nullable().optional(),
	totalVolumes: z.number().nullable().optional(),
	currentVolume: z.number().nullable().optional(),
	lastName: z.string().nullable().optional(),
	firstName: z.string().nullable().optional(),
	middleName: z.string().nullable().optional(),
	genre: z.string().nullable().optional(),
	content: z.string().nullable().optional(),
	annotation: z.string().nullable().optional(),
	year: z.number().nullable().optional(),
	tags: z.array(z.string()).optional().default([]),
})
const BookAddSchema = BookSchema.omit({ id: true }).partial()
const BookUpdateSchema = BookSchema.partial()

export type Book = z.infer<typeof BookSchema>
export type BookAdd = z.infer<typeof BookAddSchema>
export type BookUpdate = z.infer<typeof BookUpdateSchema>

export { BookSchema, BookAddSchema, BookUpdateSchema }
