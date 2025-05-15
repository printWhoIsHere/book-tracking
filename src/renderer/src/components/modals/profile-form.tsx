import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormTextInput } from '@/components/ui/form-fields'

import { toast } from '@/hooks/useToast'
import { useProfile } from '@/hooks/useProfile'

const ProfileFormSchema = z
	.object({
		profileName: z.string().min(1, 'Имя профиля обязательно'),
	})
	.refine((data) => data.profileName.trim().length > 0, {
		message: 'Имя профиля не может быть пустым',
	})

interface CreateProfile extends ModalProps {
	profileName?: string
}

export function ProfileFormModal({ profileName, onClose }: CreateProfile) {
	const { addProfile, renameProfile, isAdding, isRenaming, isLoading } =
		useProfile()

	const isEditMode = Boolean(profileName)

	const form = useForm<z.infer<typeof ProfileFormSchema>>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: { profileName: profileName || '' },
	})

	if (isLoading) return <div>Загрузка...</div>

	const onSubmit = async (values: z.infer<typeof ProfileFormSchema>) => {
		const newName = values.profileName.trim()

		if (!newName) return

		if (profileName) {
			if (newName === profileName) {
				toast({
					description: 'Новое имя профиля совпадает с текущим',
					variant: 'info',
				})
				return
			}
			renameProfile([profileName, newName])
		} else {
			addProfile(newName)
		}

		form.reset()
		onClose()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
				<FormTextInput
					control={form.control}
					name='profileName'
					placeholder={
						isEditMode ? 'Введите новое имя профиля' : 'Имя нового профиля'
					}
				/>

				<Button type='submit' disabled={isAdding}>
					{isEditMode
						? isRenaming
							? 'Переименование...'
							: 'Переименовать'
						: isAdding
							? 'Создание...'
							: 'Создать профиль'}{' '}
				</Button>
			</form>
		</Form>
	)
}
