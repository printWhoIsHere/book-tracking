import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { BookTable } from '@/components/table'

export default function App(): JSX.Element {
	return (
		<>
			<Sidebar />

			<div className='relative flex flex-1 flex-col bg-background'>
				<Header />

				<div className='p-1 md:p-4'>
					<BookTable />
				</div>
			</div>

			<Toaster />
		</>
	)
}
