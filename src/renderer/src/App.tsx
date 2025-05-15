import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { DataTable } from '@/components/table'

import { MagneticButton } from '@/components/magnetic-button'
import { columns } from '@/components/table/columns'
import { useBook } from '@/hooks/useBook'

export default function App(): JSX.Element {
	const { books } = useBook()

	return (
		<div className='flex w-screen h-screen overflow-hidden'>
			<Sidebar />

			<div className='flex flex-col flex-1 overflow-hidden'>
				<Header />

				<div className='flex-1 w-full h-full p-1 md:p-4'>
					{books.length === 0 ? (
						<div className='flex flex-col items-center justify-center h-full text-muted-foreground text-sm'>
							<span className='text-foreground/80'>Нет книг</span>
							<MagneticButton>Добавить книгу</MagneticButton>
						</div>
					) : (
						<DataTable data={books} columns={columns} />
					)}
				</div>
			</div>

			<Toaster />
		</div>
	)
}
