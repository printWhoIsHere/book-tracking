import ProfileSwitcher from '@/components/profile/switcher'

export default function SidebarFooter() {
	return (
		<div data-sidebar='footer' className='flex flex-col items-center gap-2 p-2'>
			<ProfileSwitcher />
		</div>
	)
}
