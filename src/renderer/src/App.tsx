import Header from '@/components/shared/Header'
import Sidebar, { SidebarInset } from '@/components/shared/Sidebar'

export default function App(): JSX.Element {
	return (
		<>
			<Sidebar />

			<SidebarInset>
				<Header />
				<main className='p-4'>main</main>
			</SidebarInset>
		</>
	)
}
