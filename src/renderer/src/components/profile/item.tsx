import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'
import { ProfileActions } from '@/components/profile/actions'
import { Avatar } from '@/components/profile/avatar'

import { cn } from '@/utils'

interface Props {
	profile: string
	isActive: boolean
	onClick: () => void
	hotkeyLabel: string
}

export function ProfileDropdownItem({
	profile,
	isActive,
	onClick,
	hotkeyLabel,
}: Props) {
	return (
		<div
			className={cn(
				'relative group flex items-center justify-between gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-accent',
				isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
			)}
		>
			<div className='flex flex-1 items-center gap-2' onClick={onClick}>
				{Avatar(profile)}
				<span>{profile}</span>
				<DropdownMenuShortcut>{hotkeyLabel}</DropdownMenuShortcut>
			</div>

			<ProfileActions
				profile={profile}
				activeProfile={isActive ? profile : ''}
			/>
		</div>
	)
}
