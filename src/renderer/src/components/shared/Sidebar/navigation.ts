import { LucideIcon, Plus, Settings, Database, Users } from 'lucide-react'

interface navActionsProps {
	icon: LucideIcon
	title: string
	action: () => void
}

interface navPagesProps {
	icon: LucideIcon
	title: string
	isActive?: boolean
}

const navActions: navActionsProps[] = [
	{
		icon: Plus,
		title: 'Добавить',
		action: () => {
			console.log('SIDEBAR_ACTION >> Добавить')
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

export { navActions, navPages, type navActionsProps, type navPagesProps }
