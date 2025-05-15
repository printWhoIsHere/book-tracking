export const Avatar = (name: string) => {
	return (
		<div className='flex size-6 items-center justify-center rounded-sm border text-xs font-bold uppercase'>
			{name[0] || '?'}
		</div>
	)
}
