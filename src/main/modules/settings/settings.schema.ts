import { z } from 'zod'

export const TagSchema = z.object({
	name: z.string(),
	color: z.string().regex(/^#([0-9a-fA-F]{6})$/),
})

export const ColumnSchema = z.object({
	id: z.string(),
	name: z.string(),
	width: z.number().int().min(40).max(1000),
	visible: z.boolean(),
	order: z.number().int().min(0),
})

export const SettingsSchema = z.object({
	general: z.object({
		theme: z.enum(['light', 'dark', 'system']),
		activeProfile: z.string(),
	}),
	backups: z.object({
		auto: z.boolean(),
		interval: z.number().int().min(1),
		max: z.number().int().min(1).max(10),
		last: z.string().nullable(),
	}),
	table: z.object({
		columns: z.array(ColumnSchema),
		pageSize: z.number().int().min(0),
		rowHeight: z.enum(['default', 'compact', 'comfortable']),
	}),
	genres: z.array(z.string()),
	tags: z.array(TagSchema),
})

export type Settings = z.infer<typeof SettingsSchema>
