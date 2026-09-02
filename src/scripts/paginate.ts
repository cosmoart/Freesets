import { DEFAULT_PER_PAGE } from '@/scripts/view'

const SIBLINGS = 2

const ACTIVE = 'pointer-events-none bg-blue-600 text-white'
const IDLE =
	'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-300'

function pageItem(page: number, current: number) {
	const button = document.createElement('button')
	button.type = 'button'
	button.dataset.page = String(page)
	button.textContent = String(page)
	button.setAttribute('aria-label', `Go to page ${page}`)
	if (page === current) button.setAttribute('aria-current', 'page')
	button.className = `flex size-7 items-center justify-center rounded-md text-sm transition-colors ${
		page === current ? ACTIVE : IDLE
	}`

	const item = document.createElement('li')
	item.append(button)
	return item
}

export function paginate(
	nav: HTMLElement,
	matches: HTMLElement[],
	page: number,
	perPage: number = DEFAULT_PER_PAGE
) {
	const totalPages = Math.max(1, Math.ceil(matches.length / perPage))
	const current = Math.min(Math.max(page, 1), totalPages)
	const start = (current - 1) * perPage

	matches.forEach((item, index) => {
		item.hidden = index < start || index >= start + perPage
	})

	const pages = nav.querySelector<HTMLUListElement>('[data-pages]')!
	const first = nav.querySelector<HTMLButtonElement>('[data-page-first]')!
	const last = nav.querySelector<HTMLButtonElement>('[data-page-last]')!

	const from = Math.max(1, current - SIBLINGS)
	const to = Math.min(totalPages, current + SIBLINGS)

	pages.replaceChildren(
		...Array.from({ length: to - from + 1 }, (_, index) => pageItem(from + index, current))
	)

	first.disabled = current === 1
	first.dataset.page = '1'
	last.disabled = current === totalPages
	last.dataset.page = String(totalPages)
	nav.hidden = totalPages <= 1

	return current
}
