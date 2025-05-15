import {
	LucideIcon,
	Plus,
	Upload,
	Download,
	Sliders,
	Table,
	RotateCcw,
	Tags,
	BookOpenCheck,
	Trash,
} from 'lucide-react'
import { VariantProps } from 'class-variance-authority'

import type { buttonVariants } from '@/components/ui/button'
import * as Modal from '@/components/modals'

interface BaseNavItem {
	title: string
	icon: LucideIcon
	variant?: VariantProps<typeof buttonVariants>['variant']
}

interface ModalNavItem extends BaseNavItem {
	kind: 'modal'
	modal: React.ComponentType<any>
	modalTitle: string
	modalDescription?: string
	modalProps?: Record<string, unknown>
}

interface ActionNavItem extends BaseNavItem {
	kind: 'action'
	actionKey: string
}

type NavItem = ModalNavItem | ActionNavItem

interface NavGroup {
	group: 'actions' | 'settings'
	items: NavItem[]
}

const navigation: NavGroup[] = [
	{
		group: 'actions',
		items: [
			{
				kind: 'modal',
				title: 'Добавить книгу',
				icon: Plus,
				variant: 'secondary',
				modal: Modal.BookFormModal,
				modalTitle: 'Добавить книгу',
				modalDescription: 'Введите информацию о новой книге',
			},
			{
				kind: 'action',
				title: 'Экспорт данных',
				icon: Upload,
				actionKey: 'exportBooks',
			},
			{
				kind: 'modal',
				title: 'Импорт данных',
				icon: Download,
				modal: Modal.BookFormModal,
				modalTitle: 'Импорт данных',
				modalDescription: 'Загрузите данные из Excel файла',
			},
			{
				kind: 'action',
				title: 'Удалить выбранные книги',
				icon: Trash,
				variant: 'destructive',
				actionKey: 'deleteSelected',
			},
		],
	},
	{
		group: 'settings',
		items: [
			{
				kind: 'modal',
				title: 'Общие',
				icon: Sliders,
				modal: Modal.GeneralSettingsModal,
				modalTitle: 'Общие настройки',
				modalDescription: 'Настройка темы, вида и интерфейса приложения',
			},
			{
				kind: 'modal',
				title: 'Таблица',
				icon: Table,
				modal: Modal.TableSettingsModal,
				modalTitle: 'Настройки таблицы',
				modalDescription: 'Конфигурация отображения таблицы и колонок',
			},
			{
				kind: 'modal',
				title: 'Бэкапы',
				icon: RotateCcw,
				modal: Modal.BackupSettingsModal,
				modalTitle: 'Резервные копии',
				modalDescription: 'Настройка автоматического резервного копирования',
			},
			{
				kind: 'modal',
				title: 'Жанры',
				icon: BookOpenCheck,
				modal: Modal.GenresSettingsModal,
				modalTitle: 'Настройка жанров',
				modalDescription: 'Добавьте, измените или удалите жанры книг',
			},
			{
				kind: 'modal',
				title: 'Ярлыки',
				icon: Tags,
				modal: Modal.TagsSettingsModal,
				modalTitle: 'Настройка тегов',
				modalDescription: 'Управление пользовательскими тегами и цветами',
			},
		],
	},
]

export { navigation }
export type { NavItem, NavGroup }
