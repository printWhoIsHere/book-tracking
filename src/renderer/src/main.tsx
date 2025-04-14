import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/global.css'

import { ThemeProvider } from '@/providers/theme-provider'

import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='system' storageKey='theme'>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
