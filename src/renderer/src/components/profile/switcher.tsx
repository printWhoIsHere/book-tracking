import { useEffect } from 'react'
import { ChevronsUpDown } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/sidebar/menu-items'
import { Skeleton } from '@/components/ui/skeleton'

import { useSidebar } from '@/providers/sidebar-provider'
import { useProfile } from '@/hooks/useProfile'
import { useBook } from '@/hooks/useBook'
import { formatHotkeyLabel } from '@/lib/hotkeys'
import { ProfileDropdownItem } from './item'
import { CreateProfileButton } from './actions'

export default function ProfileSwitcher() {
	const { isMobile } = useSidebar()

	const { profiles, activeProfile, switchProfile, isLoading, isActiveLoading } =
		useProfile()
	const { books, refetch: refetchBooks } = useBook()

	useEffect(() => {
		if (activeProfile) {
			refetchBooks()
		}
	}, [activeProfile, refetchBooks])

	if (isLoading || isActiveLoading)
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton disabled>
						<Skeleton className='h-8 w-full' />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		)

	if (!activeProfile) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton>
							<div className='flex size-8 items-center justify-center rounded-lg group-data-[state=expanded]:bg-sidebar-primary group-data-[state=expanded]:text-sidebar-primary-foreground'>
								<div className='text-xs font-bold uppercase'>
									{activeProfile[0] || '?'}
								</div>
							</div>
							<div className='data-[state=collapsed]:hidden grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{activeProfile}</span>
								<span className='truncate text-xs text-muted-foreground'>
									{books.length} books
								</span>
							</div>
							<ChevronsUpDown className='ml-auto group-data-[state=collapsed]:hidden size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>
							Profiles
						</DropdownMenuLabel>

						{profiles.map((profile, index) => (
							<ProfileDropdownItem
								key={profile}
								profile={profile}
								isActive={profile === activeProfile}
								onClick={() =>
									profile !== activeProfile && switchProfile(profile)
								}
								hotkeyLabel={formatHotkeyLabel(String(index + 1))}
							/>
						))}

						<DropdownMenuSeparator />

						<CreateProfileButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
