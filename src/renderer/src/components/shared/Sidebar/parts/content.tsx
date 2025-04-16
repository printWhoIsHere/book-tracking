import { NavActions, NavPages } from '@/components/shared/Sidebar/nav-items'
import { navActions, navPages } from '@/components/shared/navigation'

import { useSidebar } from '@/providers/sidebar-provider'

export default function SidebarContent() {
	const { open } = useSidebar()

	return (
		<div
			data-sidebar='content'
			className='flex flex-1 flex-col min-h-0 gap-2 overflow-y-auto'
		>
			<NavActions items={navActions} />

			{open && <NavPages pages={navPages} />}
		</div>
	)
}
