import { logger } from '@main/core/logger'

export function parseTags<T extends { tags?: any }>(item: T): T {
	if (typeof item.tags === 'string') {
		try {
			item.tags = JSON.parse(item.tags)
		} catch (err) {
			logger.error('[TAGS] Failed to parse tags', item.tags, err)
			item.tags = []
		}
	}
	return item
}

export function parseTagsInArray<T extends { tags?: any }>(items: T[]): T[] {
	return items.map(parseTags)
}
