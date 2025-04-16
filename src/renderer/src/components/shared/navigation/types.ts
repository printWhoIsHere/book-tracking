import { LucideIcon } from 'lucide-react'

interface navItemsProps {
	icon: LucideIcon
	title: string
}

interface navActionsProps extends navItemsProps {
	action: () => void
}

interface navPagesProps extends navItemsProps {
	isActive?: boolean
}

export type { navActionsProps, navPagesProps }
