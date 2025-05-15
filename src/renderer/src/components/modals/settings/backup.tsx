import { useCallback, useMemo, useState } from 'react'
import { Box, Repeat, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useSettings } from '@/hooks/useSettings'
import { useBackup } from '@/hooks/useBackup'
import { formatBackupDate } from '@/utils'

export function BackupSettingsModal({ onClose }: ModalProps) {
	const { backups, isLoading, createBackup, restoreBackup, deleteBackup } =
		useBackup()
	const { settings, setSettings } = useSettings()
	const [isCreating, setIsCreating] = useState(false)

	const backupList = useMemo(
		() =>
			backups.map((file) => ({
				file,
				date: formatBackupDate(file),
			})),
		[backups],
	)

	const handleCreate = useCallback(async () => {
		setIsCreating(true)
		try {
			await createBackup()
		} finally {
			setIsCreating(false)
		}
	}, [createBackup])

	const handleAutoToggle = useCallback(
		(auto: boolean) => {
			setSettings({
				...settings,
				backups: { ...settings.backups, auto },
			})
		},
		[settings, setSettings],
	)

	return (
		<div className='space-y-6 p-4'>
			{/* Заголовок и кнопка создания */}
			<header className='flex items-center justify-between'>
				<h2 className='text-xl font-semibold'>Резервные копии</h2>
				<Button onClick={handleCreate} disabled={isCreating}>
					{isCreating ? (
						<>
							<Box className='mr-2 h-4 w-4 animate-spin' />
							Создание...
						</>
					) : (
						'Создать копию'
					)}
				</Button>
			</header>

			<Separator />

			{/* Авто-бэкап */}
			<section className='flex items-center justify-between'>
				<div>
					<h3 className='text-lg font-medium'>Авто-резервное копирование</h3>
					<p className='text-sm text-muted-foreground'>
						Создавать копию по расписанию
					</p>
				</div>
				<Switch
					checked={settings.backups.auto}
					onCheckedChange={handleAutoToggle}
				/>
			</section>

			<Separator />

			{/* Список бэкапов */}
			<ScrollArea className='h-[350px]'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-1/2'>Файл</TableHead>
							<TableHead>Дата</TableHead>
							<TableHead className='text-right'>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={3} className='py-8 text-center'>
									Загрузка…
								</TableCell>
							</TableRow>
						) : backupList.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className='py-8 text-center text-muted-foreground'
								>
									Нет копий
								</TableCell>
							</TableRow>
						) : (
							backupList.map(({ file, date }) => (
								<TableRow key={file}>
									<TableCell className='font-mono'>
										{file.replace(/\.zip$/, '')}
									</TableCell>
									<TableCell>{date}</TableCell>
									<TableCell className='text-right space-x-2'>
										<Button
											variant='outline'
											size='sm'
											onClick={() => restoreBackup(file)}
											title='Восстановить'
										>
											<Repeat className='h-4 w-4' />
										</Button>
										<Button
											variant='destructive'
											size='sm'
											onClick={() => deleteBackup(file)}
											title='Удалить'
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</ScrollArea>

			{/* Кнопка закрыть */}
			<div className='flex justify-end'>
				<Button variant='ghost' onClick={onClose}>
					Закрыть
				</Button>
			</div>
		</div>
	)
}
