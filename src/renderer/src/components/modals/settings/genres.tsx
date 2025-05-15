import { useEffect, useMemo, useState } from 'react'
import { X as Remove, Plus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast } from '@/hooks/useToast'
import { useSettings } from '@/hooks/useSettings'

export function GenresSettingsModal({ onClose }: ModalProps) {
	const { settings, setSettings: updateSettings } = useSettings()

	const [genres, setGenres] = useState<string[]>([])
	const [initialGenres, setInitialGenres] = useState<string[]>([])
	const [newGenre, setNewGenre] = useState('')
	const [errorIndexes, setErrorIndexes] = useState<Set<number>>(new Set())

	useEffect(() => {
		if (settings?.genres) {
			setGenres(settings.genres)
			setInitialGenres(settings.genres)
		}
	}, [settings.genres])

	const hasChanges = useMemo(
		() =>
			genres.length !== initialGenres.length ||
			genres.some((g, i) => g !== initialGenres[i]),
		[genres, initialGenres],
	)

	const handleAdd = () => {
		const trimmed = newGenre.trim()
		if (!trimmed) {
			toast({ description: 'Жанр не может быть пустым', variant: 'info' })
			return
		}
		if (genres.some((g) => g.toLowerCase() === trimmed.toLowerCase())) {
			toast({ description: 'Такой жанр уже существует', variant: 'info' })
			return
		}
		setGenres([...genres, trimmed])
		setNewGenre('')
	}

	const handleRemove = (genre: string) => {
		setGenres((prev) => prev.filter((g) => g !== genre))
	}

	const handleEdit = (value: string, index: number) => {
		const newGenres = [...genres]
		newGenres[index] = value
		setGenres(newGenres)
	}

	const handleSave = () => {
		if (!settings) return

		const trimmedGenres = genres.map((g) => g.trim())
		const newErrorIndexes = new Set<number>()

		// Проверка на пустые значения
		trimmedGenres.forEach((g, i) => {
			if (g === '') newErrorIndexes.add(i)
		})

		// Проверка на дубликаты
		const lowerCased = trimmedGenres.map((g) => g.toLowerCase())
		lowerCased.forEach((g, i) => {
			if (lowerCased.indexOf(g) !== i) newErrorIndexes.add(i)
		})

		if (newErrorIndexes.size > 0) {
			setErrorIndexes(newErrorIndexes)
			toast({
				description: 'Проверьте выделенные поля: пустые или дубликаты',
				variant: 'destructive',
			})
			return
		}

		setErrorIndexes(new Set())
		updateSettings({ ...settings, genres: trimmedGenres })
		setInitialGenres(trimmedGenres)
		onClose?.()
		toast({ description: 'Настройки сохранены', variant: 'success' })
	}

	const handleClose = () => {
		setGenres(initialGenres)
		setErrorIndexes(new Set())
		onClose?.()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleAdd()
		}
	}

	return (
		<div className='space-y-5 h-full flex flex-col'>
			<div className='flex rounded border focus-within:ring-1 focus-within:ring-ring'>
				<Input
					placeholder='Add genre'
					value={newGenre}
					onChange={(e) => setNewGenre(e.target.value)}
					onKeyDown={handleKeyDown}
					className='ring-offset-background border-none focus-visible:ring-0 focus-visible:ring-offset-0'
				/>
				<Button
					variant='outline'
					size='icon'
					className='border-none'
					onClick={handleAdd}
				>
					<Plus />
				</Button>
			</div>

			<div className='grid grid-cols-2 gap-2 flex-1 overflow-auto'>
				{genres.map((genre, index) => (
					<div key={`${genre}-${index}`} className='flex items-center gap-2'>
						<Input
							value={genre}
							onChange={(e) => handleEdit(e.target.value, index)}
							className={
								errorIndexes.has(index)
									? 'border-red-500 ring-red-500 focus-visible:ring-red-500'
									: ''
							}
						/>
						<Button
							variant='ghost'
							size='icon'
							className='text-destructive w-4 h-4 hover:bg-background'
							onClick={() => handleRemove(genre)}
						>
							<Remove />
						</Button>
					</div>
				))}
			</div>

			<div className='w-full flex justify-end mt-auto'>
				<Button variant='ghost' onClick={handleClose}>
					Вернуться
				</Button>
				<Button className='ml-2' onClick={handleSave} disabled={!hasChanges}>
					Сохранить
				</Button>
			</div>
		</div>
	)
}
