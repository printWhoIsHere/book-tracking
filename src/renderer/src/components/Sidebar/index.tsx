import { cn } from '@/utils'

import { useSidebar } from '@/providers/sidebar-provider'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

import SidebarHeader from '@/components/sidebar/parts/header'
import SidebarContent from '@/components/sidebar/parts/content'
import SidebarFooter from '@/components/sidebar/parts/footer'

export default function Sidebar() {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile}>
				<SheetContent
					data-sidebar='sidebar'
					data-mobile='true'
					side='left'
					className='w-[18rem] border-r bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden'
				>
					<SheetHeader className='sr-only'>
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Mobile navigation panel</SheetDescription>
					</SheetHeader>
					<div className='flex h-full w-full flex-col'>
						<SidebarHeader />
						<SidebarContent />
						<SidebarFooter />
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<div
			data-state={state}
			className='group/sidebar hidden text-sidebar-foreground md:block'
		>
			{/* Пустышка для push layout-а */}
			<div
				className={cn(
					'relative transition-[width] duration-200 ease-linear',
					state === 'expanded'
						? 'w-[--sidebar-width]'
						: 'w-[--sidebar-width-icon]',
				)}
			/>

			{/* Настоящий Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-10 border-r transition-[width] duration-200 ease-linear md:flex',
					state === 'expanded'
						? 'w-[--sidebar-width]'
						: 'w-[--sidebar-width-icon]',
				)}
			>
				<div
					data-sidebar='sidebar'
					data-state={state}
					className='group flex h-full w-full flex-col bg-sidebar'
				>
					<SidebarHeader />
					<SidebarContent />
					<SidebarFooter />
				</div>
			</div>
		</div>
	)
}
