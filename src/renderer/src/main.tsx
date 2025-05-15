import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@/assets/global.css'

import { AppInitProvider } from '@/providers/app-init-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { TableProvider } from '@/providers/table-provider'
import { SidebarProvider } from '@/providers/sidebar-provider'
import { ModalProvider } from '@/providers/modal-provider'

import App from '@/App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1, // Повторять запрос только один раз при ошибке
			staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
		},
	},
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppInitProvider>
				<ThemeProvider>
					<TableProvider>
						<SidebarProvider>
							<ModalProvider />
							<App />
						</SidebarProvider>
					</TableProvider>
				</ThemeProvider>
			</AppInitProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
