export const PER_PAGE_OPTIONS = [12, 24, 42, 84]
export const DEFAULT_PER_PAGE = 42
export const MIN_COLUMNS = 2
export const MAX_COLUMNS = 6
export const DEFAULT_COLUMNS = 4

const PER_PAGE_KEY = 'freesets:per-page'
const COLUMNS_KEY = 'freesets:columns'
const SORT_KEY = 'freesets:sort'

function read(key: string, fallback: number, valid: (value: number) => boolean) {
	try {
		const stored = Number(localStorage.getItem(key))
		return valid(stored) ? stored : fallback
	} catch {
		return fallback
	}
}

function write(key: string, value: number) {
	try {
		localStorage.setItem(key, String(value))
	} catch {
		/* storage unavailable */
	}
}

export function readPerPage() {
	return read(PER_PAGE_KEY, DEFAULT_PER_PAGE, (value) => PER_PAGE_OPTIONS.includes(value))
}

export function savePerPage(value: number) {
	write(PER_PAGE_KEY, value)
}

export function readColumns() {
	return read(COLUMNS_KEY, DEFAULT_COLUMNS, (value) => value >= MIN_COLUMNS && value <= MAX_COLUMNS)
}

export function saveColumns(value: number) {
	write(COLUMNS_KEY, value)
}

export const SORTS = ['popular', 'newest', 'name'] as const
export type Sort = (typeof SORTS)[number]

export function readSort(): Sort {
	try {
		const stored = localStorage.getItem(SORT_KEY) as Sort
		return SORTS.includes(stored) ? stored : 'popular'
	} catch {
		return 'popular'
	}
}

export function saveSort(value: Sort) {
	try {
		localStorage.setItem(SORT_KEY, value)
	} catch {
		/* storage unavailable */
	}
}
