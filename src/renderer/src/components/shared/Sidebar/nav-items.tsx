import {
	navActionsProps,
	navPagesProps,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/shared/Sidebar'

export function NavActions({ items }: { items: navActionsProps[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className='group-data-[state=collapsed]:hidden'>
				Actions
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton tooltip={item.title} onClick={item.action}>
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
		<SidebarGroup className='group-data-[state=collapsed]:hidden'>
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
