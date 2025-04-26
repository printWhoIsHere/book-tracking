import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/Sidebar/menu-items'

import { NavGroup, NavItem } from '@/navigation'
import { exportBooks } from '@/lib/export'
import { useModal } from '@/hooks/useModal'

export function NavItems({
	label,
	items,
}: {
	label: NavGroup['group']
	items: NavItem[]
}) {
	const { openModal } = useModal()

	const handleClick = (item: NavItem) => {
		if (item.modal) {
			openModal(item.modal, item.modalTitle, item.modalDescription, item.size)
		}

		if (item.actionKey) {
			if (item.actionKey === 'exportBooks') {
				exportBooks()
			} else {
				console.log(`Action triggered for ${item.actionKey}`)
			}
		}
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel className='capitalize'>{label}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							onClick={() => handleClick(item)}
							tooltip={item.title}
							variant={item.variant ?? undefined}
						>
							<item.icon />
							<span className='group-data-[state=collapsed]:hidden'>
								{item.title}
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
