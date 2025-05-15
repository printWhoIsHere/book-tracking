import { useMemo } from 'react'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/sidebar/menu-items'

import { NavGroup, NavItem } from '@/navigation'
import { useModal } from '@/hooks/useModal'
import { useTableContext } from '@/providers/table-provider'
import { useBook } from '@/hooks/useBook'
import { ConfirmModal } from '../modals'

export function NavItems({
	label,
	items,
}: {
	label: NavGroup['group']
	items: NavItem[]
}) {
	const { openModal } = useModal()
	const { deleteBooks } = useBook()
	const { selectedRows } = useTableContext()

	const visibleItems = useMemo(
		() =>
			items.filter((item) => {
				if (item.kind === 'action' && item.actionKey === 'deleteSelected') {
					return selectedRows.length > 0
				}
				return true
			}),
		[items, selectedRows],
	)

	const handleClick = (item: NavItem) => {
		if (item.kind === 'modal') {
			openModal(item.modal, {
				title: item.modalTitle,
				description: item.modalDescription,
				props: item.modalProps,
			})
		} else if (item.kind === 'action') {
			switch (item.actionKey) {
				case 'exportBooks':
					console.log('EXPORT CLICK')
					break
				case 'deleteSelected':
					console.log(selectedRows)
					openModal(ConfirmModal, {
						title: 'Подтверждение',
						props: {
							message: 'Удалить выбранные книги?',
							onConfirm: () => deleteBooks(selectedRows),
						},
					})
					break
				default:
					console.warn(`Unknown action: ${item.actionKey}`)
			}
		}
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel className='capitalize'>{label}</SidebarGroupLabel>
			<SidebarMenu>
				{visibleItems.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							onClick={() => handleClick(item)}
							tooltip={item.title}
							variant={item.variant}
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
