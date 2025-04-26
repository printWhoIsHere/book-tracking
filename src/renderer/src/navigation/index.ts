import {
	LucideIcon,
	Plus,
	Upload,
	Download,
	Archive,
	Sliders,
	Table,
	RotateCcw,
	Tags,
	BookOpenCheck,
} from 'lucide-react'
import { VariantProps } from 'class-variance-authority'

import * as Modal from '@/components/modals'
import type { buttonVariants } from '@/components/ui/button'
import type { ModalSize } from '@/hooks/useModal'

interface BaseNavItem {
	title: string
	icon: LucideIcon
	variant?: VariantProps<typeof buttonVariants>['variant']
}

interface ModalNavItem extends BaseNavItem {
	modal: React.ComponentType<any>
	modalTitle: string
	modalDescription?: string
	size?: ModalSize
	actionKey?: never
}

interface ActionNavItem extends BaseNavItem {
	actionKey: string
	modal?: never
	modalTitle?: never
	modalDescription?: never
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
				title: 'Добавить книгу',
				icon: Plus,
				modal: Modal.BookFormModal,
				modalTitle: 'Добавить книгу',
				modalDescription: 'Введите информацию о новой книге',
				variant: 'secondary',
			},
			{
				title: 'Экспорт данных',
				icon: Upload,
				actionKey: 'exportBooks',
			},
			{
				title: 'Импорт данных',
				icon: Download,
				modal: Modal.ImportModal,
				modalTitle: 'Импорт данных',
				modalDescription: 'Загрузите данные из Excel файла',
			},
			{
				title: 'Архивированные записи',
				icon: Archive,
				actionKey: 'toggleArchive',
			},
		],
	},
	{
		group: 'settings',
		items: [
			{
				title: 'General',
				icon: Sliders,
				modal: Modal.GeneralSettingsModal,
				modalTitle: 'Общие настройки',
				modalDescription: 'Настройка темы, вида и интерфейса приложения',
			},
			{
				title: 'Table',
				icon: Table,
				modal: Modal.TableSettingsModal,
				modalTitle: 'Настройки таблицы',
				modalDescription: 'Конфигурация отображения таблицы и колонок',
			},
			{
				title: 'Backups',
				icon: RotateCcw,
				modal: Modal.BackupsSettingsModal,
				modalTitle: 'Резервные копии',
				modalDescription: 'Настройка автоматического резервного копирования',
			},
			{
				title: 'Genres',
				icon: BookOpenCheck,
				modal: Modal.GenresSettingsModal,
				modalTitle: 'Настройка жанров',
				modalDescription: 'Добавьте, измените или удалите жанры книг',
			},
			{
				title: 'Tags',
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
