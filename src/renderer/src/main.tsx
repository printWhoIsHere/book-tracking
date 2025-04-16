import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/global.css'

import { ThemeProvider } from '@/providers/theme-provider'
import { SidebarProvider } from '@/providers/sidebar-provider'

import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<SidebarProvider>
				<App />
			</SidebarProvider>
		</ThemeProvider>
	</React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
