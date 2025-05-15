import { type ClassValue, clsx } from 'clsx'
import { format, isValid, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Объединяет ФИО в формат: "Фамилия, Имя Отчество".
 * Если какие-либо части отсутствуют, они не будут отображаться.
 * @param lastName Фамилия
 * @param firstName Имя
 * @param middleName Отчество
 * @returns Строка в формате "Фамилия, Имя Отчество" или только доступные части.
 * Например, "Иванов, Иван" или "Иванов, Иван Иванович"
 */
export function formatFullName(
	lastName?: string | null,
	firstName?: string | null,
	middleName?: string | null,
): string {
	const nameParts = [firstName, middleName].filter(Boolean).join(' ')
	const fullNameParts = [lastName, nameParts].filter(Boolean)
	return fullNameParts.join(', ') || ''
}

export function formatVolumes(
	current?: number | null,
	total?: number | null,
): string {
	if (current == null && total == null) return '—'
	if (current != null && total == null) return `${current} из *`
	if (current == null && total != null) return `* из ${total}`
	return `${current} из ${total}`
}

const DEFAULT_TAG_COLOR = '#d3cfc7'
/**
 * Возвращает цвет для каждого тега на основе настроек.
 * @param tagName Название тега
 * @param settings Объект настроек пользователя
 */
export function getTagColor(tagName: string, settings: Settings): string {
	const found = settings.tags.find((tag) => tag.name === tagName)
	return found?.color ?? DEFAULT_TAG_COLOR
}

/**
 * Возвращает отображение { тег: цвет } для списка тегов
 */
export function getTagColorMap(
	tags: string[],
	settings: Settings,
): Record<string, string> {
	const map: Record<string, string> = {}

	for (const tag of tags) {
		map[tag] = getTagColor(tag, settings)
	}

	return map
}

export function formatBackupDate(filename: string): string {
	const raw = filename.match(/\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/)?.[0]
	if (!raw) return '—'
	const iso = raw.replace(
		/T(\d{2})-(\d{2})-(\d{2})/,
		(_, h, m, s) => `T${h}:${m}:${s}`,
	)
	const date = parseISO(iso)
	return isValid(date) ? format(date, 'dd.MM.yyyy HH:mm') : '—'
}
