import { NavActions, NavPages } from '@/components/shared/Sidebar/nav-items'
import { navActions, navPages } from '../navigation'
import { Separator } from '@/components/ui/separator'

export default function SidebarContent() {
	return (
		<div
			data-sidebar='content'
			className='flex flex-1 flex-col min-h-0 gap-2 overflow-hidden'
		>
			<NavActions items={navActions} />

			<Separator orientation='horizontal' className='mx-auto w-4' />

			<NavPages pages={navPages} />
		</div>
	)
}
