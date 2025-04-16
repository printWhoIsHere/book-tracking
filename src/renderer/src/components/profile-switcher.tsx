import { useState } from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './shared/Sidebar/menu'

import { useSidebar } from '@/providers/sidebar-provider'
import { profiles } from '@/mock-data'
import { cn } from '@/lib/utils'

export default function ProfileSwitcher() {
	const { isMobile } = useSidebar()
	const [activeProfile, setActiveProfile] = useState(profiles[0])

	if (!activeProfile) {
		return null
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton>
							<div className='flex aspect-square size-8 items-center justify-center rounded-lg group-data-[state=expanded]:bg-sidebar-primary group-data-[state=expanded]:text-sidebar-primary-foreground'>
								<Skeleton className='w-4 h-4' />
							</div>
							<div className='data-[state=collapsed]:hidden grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{activeProfile.name}
								</span>
								<span className='truncate text-xs'>
									{activeProfile.quantity}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto group-data-[state=collapsed]:hidden' />
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
							<DropdownMenuItem
								key={profile.name}
								onClick={() => setActiveProfile(profile)}
								className={cn(
									'gap-2 p-2',
									profile.name === activeProfile.name &&
										'bg-sidebar-accent text-sidebar-accent-foreground',
								)}
							>
								<div className='flex size-6 items-center justify-center rounded-sm border'>
									<Skeleton className='w-4 h-4 shrink-0' />
								</div>
								{profile.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2'>
							<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
								<Plus className='size-4' />
							</div>
							<div className='font-medium text-muted-foreground'>Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
