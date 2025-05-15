import { app } from 'electron'
import path from 'path'
import { is } from '@electron-toolkit/utils'

const root = is.dev
	? path.resolve(__dirname, '../../data')
	: app.getPath('userData')

export const paths = {
	directories: {
		root,
		profiles: path.join(root, 'profiles'),
		backups: path.join(root, 'backups'),
	},
	files: {
		settings: path.join(root, 'settings.json'),
	},
}
