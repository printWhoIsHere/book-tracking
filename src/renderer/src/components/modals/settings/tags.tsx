import { useEffect, useMemo, useState } from 'react'
import { X as Remove, Plus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'

import { useSettings } from '@/hooks/useSettings'

export function TagsSettingsModal({ onClose }: ModalProps) {
	const { settings, setSettings } = useSettings()

	const [tags, setTags] = useState<Tag[]>([])
	const [initialTags, setInitialTags] = useState<Tag[]>([])

	useEffect(() => {
		const safeTags = settings?.tags ?? []
		setTags(safeTags)
		setInitialTags(safeTags)
	}, [settings])

	const isDuplicate = (name: string, index: number) => {
		return tags.some(
			(tag, i) =>
				i !== index &&
				tag.name.trim().toLowerCase() === name.trim().toLowerCase(),
		)
	}

	const handleAddEmptyTag = () => {
		const hasEmpty = tags.some((tag) => !tag.name.trim())
		if (!hasEmpty) {
			setTags([...tags, { name: '', color: '#000000' }])
		}
	}

	const handleTagChange = (
		index: number,
		key: 'name' | 'color',
		value: string,
	) => {
		setTags((prev) => {
			const updated = [...prev]
			updated[index] = { ...updated[index], [key]: value }
			return updated
		})
	}

	const handleRemoveTag = (index: number) => {
		setTags(tags.filter((_, i) => i !== index))
	}

	const hasChanges = useMemo(() => {
		const filtered = tags.filter((tag) => tag.name.trim() !== '')
		return JSON.stringify(filtered) !== JSON.stringify(initialTags)
	}, [tags, initialTags])

	const handleSave = () => {
		if (!settings) return

		const filtered = tags.filter((tag) => tag.name.trim() !== '')
		setSettings({ ...settings, tags: filtered })
		setInitialTags(filtered)
		onClose?.()
	}

	const handleClose = () => {
		onClose?.()
		setTags((prev) => prev.filter((tag) => tag.name.trim() !== ''))
	}

	return (
		<div className='flex flex-col flex-1'>
			<div className='grid grid-cols-2 gap-2 overflow-auto'>
				{tags.map((tag, index) => (
					<div key={index} className='flex items-center gap-2'>
						<ColorPicker
							initialColor={tag.color}
							onColorChange={(color) => handleTagChange(index, 'color', color)}
						/>
						<Input
							value={tag.name}
							placeholder='Tag name'
							onChange={(e) => handleTagChange(index, 'name', e.target.value)}
							className={isDuplicate(tag.name, index) ? 'border-red-500' : ''}
						/>
						<Button
							variant='ghost'
							size='icon'
							className='text-destructive w-4 h-4 hover:bg-background'
							onClick={() => handleRemoveTag(index)}
						>
							<Remove />
						</Button>
					</div>
				))}

				{/* Кнопка для добавления пустого поля */}
				<Button
					variant='outline'
					size='icon'
					className='my-auto w-8 h-8'
					onClick={handleAddEmptyTag}
					disabled={tags.some((tag) => !tag.name.trim())}
				>
					<Plus />
				</Button>
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
