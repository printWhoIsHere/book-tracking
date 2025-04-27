import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ModalProps } from '@/hooks/useModal'
import { toast } from '@/hooks/useToast'
import { importBooks } from '@/lib/import'

export function ImportModal({ onClose }: ModalProps) {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	const handleImport = async () => {
		if (file) {
			try {
				const formData = new FormData()
				formData.append('file', file)

				importBooks(formData)

				onClose?.()
			} catch (error) {
				toast({
					description: 'Ошибка импорта: ' + error,
					variant: 'destructive',
				})
			}
		}
	}

	return (
		<div>
			<div className='w-80 m-auto'>
				<Input
					id='picture'
					type='file'
					className='mt-1 file:pt-0.5'
					onChange={handleFileChange}
				/>
			</div>

			<div className='w-full flex justify-end mt-8'>
				<Button variant='ghost' onClick={onClose}>
					Вернуться
				</Button>
				<Button className='ml-2' onClick={handleImport}>
					Импорт
				</Button>
			</div>
		</div>
	)
}
