import { Plus } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function ProfileDropdownCreateItem({
	onClick,
}: {
	onClick: () => void
}) {
	return (
		<DropdownMenuItem className='gap-2 p-2' onClick={onClick}>
			<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
				<Plus className='size-4' />
			</div>
			<div className='font-medium text-muted-foreground'>
				Create new profile
			</div>
		</DropdownMenuItem>
	)
}
