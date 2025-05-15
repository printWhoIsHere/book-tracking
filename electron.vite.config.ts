import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		resolve: {
			alias: {
				'@main': resolve(__dirname, 'src/main'),
				'@logger': resolve(__dirname, 'src/main/core/logger'),
				'@preload': resolve(__dirname, 'src/preload'),
			},
		},
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		resolve: {
			alias: {
				'@main': resolve(__dirname, 'src/main'),
				'@preload': resolve(__dirname, 'src/preload'),
			},
		},
	},
	renderer: {
		plugins: [react()],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src/renderer/src'),
				'@main': resolve(__dirname, 'src/main'),
			},
		},
	},
})
