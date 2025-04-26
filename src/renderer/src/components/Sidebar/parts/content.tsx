import { NavItems } from '@/components/Sidebar/nav-items'
import { navigation } from '@/navigation'

import { useSidebar } from '@/providers/sidebar-provider'

export default function SidebarContent() {
	const { state } = useSidebar()
	const visibleGroups = state == 'collapsed' ? [navigation[0]] : navigation

	return (
		<div
			data-sidebar='content'
			className='flex flex-1 flex-col min-h-0 gap-2 overflow-y-auto'
		>
			{visibleGroups.map((group) => (
				<NavItems key={group.group} items={group.items} label={group.group} />
			))}
		</div>
	)
}
