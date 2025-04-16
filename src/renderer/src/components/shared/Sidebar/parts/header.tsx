import logo from '@/assets/logo.svg'

export default function SidebarHeader() {
	return (
		<div
			data-sidebar='header'
			className='flex items-center justify-center gap-2 p-2'
		>
			<img src={logo} alt='logo' className='h-8 w-8' />

			<h1 className='text-base font-medium group-data-[state=collapsed]:hidden whitespace-nowrap'>
				Book Tracking
			</h1>
		</div>
	)
}
