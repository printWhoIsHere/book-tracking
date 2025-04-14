import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Объединяет ФИО в формат: "Фамилия, Имя Отчество".
 * @param lastName Фамилия
 * @param firstName Имя
 * @param middleName Отчество
 * @returns Строка "Фамилия, Имя Отчество" или только доступные части.
 */
export function formatFullName(
	lastName?: string,
	firstName?: string,
	middleName?: string,
): string {
	const nameParts = [firstName, middleName].filter(Boolean).join(' ') // Имя Отчество
	const fullName = [lastName, nameParts].filter(Boolean).join(', ') // Фамилия, Имя Отчество
	return fullName
}
