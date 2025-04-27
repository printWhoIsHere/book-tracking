import { useMemo } from 'react'

import { DataTable } from '@/components/table/table-core'
import { getColumns } from '@/components/table/columns'

import { useSettings } from '@/hooks/useSettings'
import { useBooks } from '@/hooks/useBooks'

export function BookTable() {
	const { settings } = useSettings()
	const { books, isLoading } = useBooks()

	console.log('TAGS >>> ', books[0].tags)
	console.log('TYPE >>> ', typeof books)

	const columns = useMemo(
		() => getColumns(settings?.table.hiddenColumns || []),
		[settings?.table.hiddenColumns],
	)

	if (isLoading) return null

	return <DataTable data={books} columns={columns} />
}
