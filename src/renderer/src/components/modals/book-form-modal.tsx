import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import {
	MultiSelector,
	MultiSelectorTrigger,
	MultiSelectorInput,
	MultiSelectorContent,
	MultiSelectorList,
	MultiSelectorItem,
} from '@/components/ui/multi-select'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'

import { useToast } from '@/hooks/useToast'
import { useSettings } from '@/hooks/useSettings'
import { useBooks } from '@/hooks/useBooks'
import { ModalProps } from '@/hooks/useModal'
import { Book } from 'src/types'

const formSchema = z
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

type FormSchema = z.infer<typeof formSchema>

interface BookFormModal extends ModalProps {
	book?: Book
}

export function BookFormModal({ book, onClose }: BookFormModal) {
	const { toast } = useToast()
	const { addBook, updateBook, isAdding, isUpdating, isLoading } = useBooks()
	const { settings } = useSettings()

	const isEditMode = !!book

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: book ?? {},
	})

	useEffect(() => {
		if (book) {
			const defaultValues = {
				title: book.title || '',
				totalVolumes: book.totalVolumes ?? undefined,
				currentVolume: book.currentVolume ?? undefined,
				lastName: book.lastName || '',
				firstName: book.firstName || '',
				middleName: book.middleName || '',
				genre: book.genre || '',
				content: book.content || '',
				annotation: book.annotation || '',
				year: book.year ?? undefined,
				tags: book.tags || [],
			}

			Object.entries(defaultValues).forEach(([key, value]) => {
				form.setValue(key as keyof FormSchema, value)
			})
		}
	}, [book, form])

	if (isLoading) return null

	const genres = settings?.genres ?? []
	const tags = settings?.tags.map((t) => t.name) ?? []

	const onSubmit = async (values: FormSchema) => {
		const isValid = await form.trigger()
		if (!isValid) {
			const errors = form.formState.errors

			Object.values(errors).forEach((error) => {
				if (error?.message) {
					toast({
						description: error.message,
						variant: 'destructive',
					})
				}
			})

			return
		}

		try {
			if (isEditMode) {
				updateBook({ id: book.id, updates: values })
			} else {
				addBook(values)
			}

			form.reset()
			onClose?.()
		} catch {
			// Ошибки уже обрабатываются в useBooks
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, (errors) => {
					const yearError = errors.year?.message
					if (yearError) {
						toast({
							description: yearError,
							variant: 'info',
						})
					}

					const globalError = Object.values(errors).find(
						(error) => typeof error?.message === 'string',
					)

					if (globalError?.message && !yearError) {
						toast({
							description: globalError.message,
							variant: 'info',
						})
					}
				})}
				className='space-y-6 px-1'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input id='title' placeholder='Название книги' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='totalVolumes'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										id='totalVolumes'
										type='number'
										placeholder='Всего томов'
										onWheel={(e) => e.currentTarget.blur()}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='currentVolume'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										id='currentVolume'
										type='number'
										placeholder='Текущий том'
										onWheel={(e) => e.currentTarget.blur()}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					{(['lastName', 'firstName', 'middleName'] as const).map((key) => (
						<FormField
							key={key}
							control={form.control}
							name={key}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											id={key}
											placeholder={
												key === 'lastName'
													? 'Фамилия'
													: key === 'firstName'
														? 'Имя'
														: 'Отчество'
											}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					))}
				</div>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea id='content' placeholder='Содержание' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='annotation'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea id='annotation' placeholder='Аннотация' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='year'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										id='year'
										type='number'
										min={1800}
										placeholder={new Date().getFullYear().toString()}
										inputMode='numeric'
										onWheel={(e) => e.currentTarget.blur()}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='genre'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger id='genre'>
											{/* EDIT TODO: Если такого жанра больше нет, то показывать в placeholder 'Нет такого жанра' */}
											<SelectValue placeholder='Выберите жанр' />
										</SelectTrigger>
										<SelectContent>
											{genres.map((genre) => (
												<SelectItem key={genre} value={genre}>
													{genre}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<MultiSelector
									values={field.value || []}
									onValuesChange={field.onChange}
									loop
								>
									<MultiSelectorTrigger id='tags'>
										<MultiSelectorInput placeholder='Выберите теги' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											{tags.map((t) => (
												<MultiSelectorItem key={t} value={t}>
													{t}
												</MultiSelectorItem>
											))}
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isAdding || isUpdating}>
					{!isEditMode
						? 'Добавить'
						: isAdding
							? 'Добавление...'
							: isUpdating
								? 'Обновление...'
								: 'Обновить'}
				</Button>
			</form>
		</Form>
	)
}
