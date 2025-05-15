import log from 'electron-log'
import { is } from '@electron-toolkit/utils'

log.transports.console.level = 'debug'
log.transports.console.format = '[{level}] {text}'

if (!is.dev) {
	log.transports.file.level = 'info'
	log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}.{ms} [{level}] {text}'
} else {
	log.transports.file.level = false
}

export { log as logger }
