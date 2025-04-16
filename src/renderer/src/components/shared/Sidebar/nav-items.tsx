import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/shared/Sidebar'
import { AddBookModal } from '@/components/modals'
import { navActionsProps, navPagesProps } from '@/components/shared/navigation'

import { useModal } from '@/hooks/useModal'

export function NavActions({ items }: { items: navActionsProps[] }) {
	const { openModal } = useModal()

	const handleAction = (item: navActionsProps) => {
		if (item.title === 'Добавить книгу') {
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
		} else {
			item.action()
		}
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Actions</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							tooltip={item.title}
							onClick={() => handleAction(item)}
						>
							{item.icon && <item.icon />}
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

export function NavPages({ pages }: { pages: navPagesProps[] }) {
	return (
		<SidebarGroup className=''>
			<SidebarGroupLabel>Pages</SidebarGroupLabel>
			<SidebarMenu>
				{pages.map((page) => (
					<SidebarMenuItem key={page.title}>
						<SidebarMenuButton tooltip={page.title} isActive={page.isActive}>
							{page.icon && <page.icon />}
							<span className=''>{page.title}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
