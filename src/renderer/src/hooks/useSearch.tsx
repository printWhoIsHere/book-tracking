import { useState } from 'react'

let globalSearch = ''

export function useSearch() {
	const [search, setSearchState] = useState(globalSearch)

	const setSearch = (value: string) => {
		globalSearch = value
		setSearchState(value)
	}

	return { search, setSearch }
}
