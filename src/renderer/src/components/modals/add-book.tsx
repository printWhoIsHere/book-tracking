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
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@/components/ui/form'

import { useToast } from '@/hooks/useToast'
import { useSettings } from '@/hooks/useSettings'
import { useBooks } from '@/hooks/useBooks'
import { ModalProps } from '@/hooks/useModal'

const formSchema = z
	.object({
		title: z.string().optional(),
		totalVolumes: z.coerce
			.number()
			.min(0, 'Кол-во томов не может быть отрицательным')
			.max(99, 'Число слишком большое')
			.optional(),
		currentVolume: z.coerce
			.number()
			.min(0, 'Кол-во томов не может быть отрицательным')
			.max(99, 'Число слишком большое')
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
			path: ['title'],
		},
	)
	.refine(
		(d) =>
			d.totalVolumes == null ||
			d.currentVolume == null ||
			d.currentVolume <= d.totalVolumes,
		{
			message: 'Текущий том не может быть больше количества томов',
			path: ['currentVolume'],
		},
	)

type FormSchema = z.infer<typeof formSchema>

export default function AddBookModal({ onClose }: ModalProps) {
	const { toast } = useToast()
	const { addBook, isAdding } = useBooks()
	const { settings, isLoading } = useSettings()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	})

	if (isLoading) return null

	const genres = settings?.genres ?? []
	const tags = settings?.tags.map((t) => t.name) ?? []

	const onSubmit = (values: FormSchema) => {
		addBook(values, {
			onSuccess: () => {
				toast({
					description: 'Книга добавлена',
					variant: 'success',
				})
				onClose?.()
			},
			onError: () => {
				toast({
					description: 'Ошибка добавления',
					variant: 'destructive',
				})
			},
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input id='title' placeholder='Название книги' {...field} />
							</FormControl>
							<FormMessage />
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
										{...field}
									/>
								</FormControl>
								<FormMessage />
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
										{...field}
									/>
								</FormControl>
								<FormMessage />
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
									<FormMessage />
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
							<FormMessage />
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
							<FormMessage />
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
										placeholder='2023'
										inputMode='numeric'
										{...field}
									/>
								</FormControl>
								<FormMessage />
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
											<SelectValue placeholder='Выберите жанр' />
										</SelectTrigger>
										<SelectContent>
											{genres.map((g) => (
												<SelectItem key={g} value={g}>
													{g}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={isAdding}>
					Добавить
				</Button>
			</form>
		</Form>
	)
}
