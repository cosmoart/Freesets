/** One resource as served by /search-index.json. */
export interface SearchEntry {
	/** Unique only inside its category; a higher id is a later addition. */
	id: number
	/** Popularity rank inside its category, higher first. */
	order: number
	/** ISO date the resource was added, when known. */
	added?: string
	name: string
	link: string
	img: string
	/** Category display name. */
	category: string
	nameID: string
	color: string
	/** Trimmed, empty when the resource has none. */
	license: string
	/** One of the latest additions, shown with a New badge. */
	isNew?: boolean
	licenseLink?: string
	licenseDescription?: string
	tags: string[]
}

let loading: Promise<SearchEntry[]> | undefined

/** Fetches the index once for the whole visit, shared by every caller. A failed fetch is retried next time. */
export function loadSearchIndex() {
	loading ??= fetch('/search-index.json')
		.then((response) => {
			if (!response.ok) throw new Error(`Search index responded ${response.status}`)
			return response.json() as Promise<SearchEntry[]>
		})
		.catch(() => {
			loading = undefined
			return []
		})

	return loading
}
