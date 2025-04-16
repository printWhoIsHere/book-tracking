import Header from '@/components/shared/Header'
import Sidebar, { SidebarInset } from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'

export default function App(): JSX.Element {
	return (
		<>
			<Sidebar />

			<SidebarInset>
				<Header />
				<>TABLE</>
			</SidebarInset>

			<Toaster />
		</>
	)
}
