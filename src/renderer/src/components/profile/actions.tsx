import { PenSquare, Trash, Plus, MoreHorizontal } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useProfile } from '@/hooks/useProfile'
import { useModal } from '@/hooks/useModal'
import { toast } from '@/hooks/useToast'
import { ConfirmModal, ProfileFormModal } from '@/components/modals'

interface ProfileActionsProps {
	profile: string
	activeProfile: string
}

function ProfileActions({ profile, activeProfile }: ProfileActionsProps) {
	const { deleteProfile } = useProfile()
	const { openModal } = useModal()

	const handleRename = () => {
		openModal(ProfileFormModal, {
			title: 'Переименовать профиль',
			description: `Старое имя профиля: ${profile}`,
			props: { profileName: profile },
		})
	}

	const handleDelete = () => {
		if (profile === activeProfile) {
			toast({
				description: 'Нельзя удалить текущий профиль.',
				variant: 'info',
			})
			return
		}

		openModal(ConfirmModal, {
			title: 'Удаление профиля',
			props: {
				message: `Вы уверены, что хотите удалить профиль "${profile}"?`,
				onConfirm: () => deleteProfile(profile),
			},
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MoreHorizontal className='w-4 h-4 text-muted-foreground hover:text-foreground' />
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				<DropdownMenuLabel className='font-normal text-xs text-foreground/70 cursor-default select-none'>
					Действия
				</DropdownMenuLabel>

				<DropdownMenuItem onClick={handleRename}>
					<PenSquare className='mr-2 h-4 w-4' />
					Переименовать
				</DropdownMenuItem>
				<DropdownMenuItem className='text-destructive' onClick={handleDelete}>
					<Trash className='mr-2 h-4 w-4' />
					Удалить
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function CreateProfileButton() {
	return (
		<DropdownMenuItem className='gap-2 p-2' onClick={() => {}}>
			<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
				<Plus className='size-4' />
			</div>
			<div className='font-medium text-muted-foreground'>
				Create new profile
			</div>
		</DropdownMenuItem>
	)
}

export { ProfileActions, CreateProfileButton }
