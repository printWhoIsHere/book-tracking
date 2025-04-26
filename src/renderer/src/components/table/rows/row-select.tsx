import { Row } from '@tanstack/react-table'
import { Book } from 'src/types'
import { Checkbox } from '@/components/ui/checkbox'

export function RowSelect({ row }: { row: Row<Book> }) {
	return (
		<Checkbox
			className='border-foreground/50 data-[state=checked]:border-primary'
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
			onClick={(e) => e.stopPropagation()}
			aria-label='Выбрать строку'
		/>
	)
}
