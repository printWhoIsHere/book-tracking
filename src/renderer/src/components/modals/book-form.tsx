import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	FormMultiSelect,
	FormNumberInput,
	FormSelect,
	FormTextarea,
	FormTextInput,
	FormYearInput,
} from '@/components/ui/form-fields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useToast } from '@/hooks/useToast'
import { useSettings } from '@/hooks/useSettings'
import { useBook } from '@/hooks/useBook'

const FormSchema = z
	.object({
		title: z.string().optional(),
		totalVolumes: z.coerce
			.number()
			.min(0, 'Кол-во томов не может быть отрицательным')
			.max(999, 'Число слишком большое')
			.optional(),
		currentVolume: z.coerce
			.number()
			.min(0, 'Кол-во томов не может быть отрицательным')
			.max(999, 'Число слишком большое')
			.optional(),
		lastName: z.string().optional(),
		firstName: z.string().optional(),
		middleName: z.string().optional(),
		genre: z.string().optional(),
		content: z.string().optional(),
		annotation: z.string().optional(),
		year: z.coerce
			.number()
			.max(new Date().getFullYear(), 'Год не может быть больше текущего')
			.optional(),
		tags: z.array(z.string()).optional(),
	})
	.refine(
		(d) =>
			!!(
				d.title ||
				d.lastName ||
				d.firstName ||
				d.middleName ||
				d.content ||
				d.annotation
			),
		{
			message:
				'Одно из полей: Название, Фамилия, Имя, Отчество, Содержание, Аннотация должно быть заполнено',
		},
	)
	.refine(
		(d) =>
			d.totalVolumes == null ||
			d.currentVolume == null ||
			d.currentVolume <= d.totalVolumes,
		{
			message: 'Текущий том не может быть больше количества томов',
		},
	)

interface BookFormModal extends ModalProps {
	book?: Book
}

export function BookFormModal({ book, onClose }: BookFormModal) {
	const { toast } = useToast()
	const { settings } = useSettings()
	const { addBook, updateBook, isAdding, isUpdating, isLoading } = useBook()

	const isEditMode = Boolean(book)

	const defaultValues: z.infer<typeof FormSchema> = {
		title: book?.title ?? '',
		totalVolumes: book?.totalVolumes ?? undefined,
		currentVolume: book?.currentVolume ?? undefined,
		lastName: book?.lastName ?? '',
		firstName: book?.firstName ?? '',
		middleName: book?.middleName ?? '',
		genre: book?.genre ?? '',
		content: book?.content ?? '',
		annotation: book?.annotation ?? '',
		year: book?.year ?? undefined,
		tags: book?.tags ?? [],
	}

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues,
	})

	if (isLoading) return <div>Загрузка...</div>

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			if (isEditMode) {
				updateBook({ id: book!.id, updates: values })
			} else {
				addBook(values)
			}

			form.reset()
			onClose()
		} catch {
			toast({
				description: 'Произошла ошибка. Попробуйте снова.',
				variant: 'destructive',
			})
		}
	}

	const onInvalid = (errors: typeof form.formState.errors) => {
		Object.values(errors).forEach((error) => {
			if (error?.message) {
				toast({
					description: error.message,
					variant: 'info',
				})
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onInvalid)}
				className='space-y-6 px-1 py-2 overflow-auto'
			>
				<FormTextInput
					control={form.control}
					name='title'
					placeholder='Название книги'
				/>

				<div className='grid grid-cols-2 gap-4'>
					<FormNumberInput
						control={form.control}
						name='totalVolumes'
						placeholder='Всего томов'
					/>
					<FormNumberInput
						control={form.control}
						name='currentVolume'
						placeholder='Текущий том'
					/>
				</div>

				<div className='grid grid-cols-3 gap-4'>
					{(['lastName', 'firstName', 'middleName'] as const).map((key) => (
						<FormTextInput
							key={key}
							control={form.control}
							name={key}
							placeholder={
								key === 'lastName'
									? 'Фамилия'
									: key === 'firstName'
										? 'Имя'
										: 'Отчество'
							}
						/>
					))}
				</div>

				<FormTextarea
					control={form.control}
					name='content'
					placeholder='Содержание'
				/>
				<FormTextarea
					control={form.control}
					name='annotation'
					placeholder='Аннотация'
				/>

				<div className='grid grid-cols-2 gap-4'>
					<FormYearInput control={form.control} name='year' />
					<FormSelect
						control={form.control}
						name='genre'
						placeholder='Выберите жанр'
						options={settings.genres ?? []}
					/>
				</div>

				<FormMultiSelect
					control={form.control}
					name='tags'
					placeholder='Выберите теги'
					options={settings.tags.map((t) => t.name) ?? []}
				/>

				<Button type='submit' disabled={isAdding || isUpdating}>
					{isEditMode
						? isUpdating
							? 'Обновление...'
							: 'Обновить'
						: isAdding
							? 'Добавление...'
							: 'Добавить'}
				</Button>
			</form>
		</Form>
	)
}
