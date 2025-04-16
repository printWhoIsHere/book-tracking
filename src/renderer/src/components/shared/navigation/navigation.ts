import { Plus, Settings, Database, Users } from 'lucide-react'

import { AddBookModal } from '@/components/modals'

import {
	navActionsProps,
	navPagesProps,
} from '@/components/shared/navigation/types'
import { useModal } from '@/hooks/useModal'

const navActions: navActionsProps[] = [
	{
		icon: Plus,
		title: 'Добавить книгу',
		action: () => {
			const { openModal } = useModal.getState()
			openModal(
				AddBookModal,
				'Добавить книгу',
				'Введите информацию о новой книге',
				{
					onSubmit: (data) => {
						console.log('Добавлена книга:', data)
					},
				},
			)
		},
	},
	{
		icon: Settings,
		title: 'Настройки',
		action: () => {
			console.log('SIDEBAR_ACTION >> Настройки')
		},
	},
]

const navPages: navPagesProps[] = [
	{
		icon: Database,
		title: 'Таблица',
	},
	{
		icon: Users,
		title: 'Авторы',
	},
]

export { navActions, navPages }
