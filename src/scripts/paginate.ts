export const PER_PAGE = 42

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
	button.className = `flex size-9 items-center justify-center rounded-md transition-colors md:size-10 ${
		page === current ? ACTIVE : IDLE
	}`

	const item = document.createElement('li')
	item.append(button)
	return item
}

export function paginate(nav: HTMLElement, matches: HTMLElement[], page: number) {
	const totalPages = Math.max(1, Math.ceil(matches.length / PER_PAGE))
	const current = Math.min(Math.max(page, 1), totalPages)
	const start = (current - 1) * PER_PAGE

	matches.forEach((item, index) => {
		item.hidden = index < start || index >= start + PER_PAGE
	})

	const pages = nav.querySelector<HTMLUListElement>('[data-pages]')!
	const previous = nav.querySelector<HTMLButtonElement>('[data-page-prev]')!
	const next = nav.querySelector<HTMLButtonElement>('[data-page-next]')!

	pages.replaceChildren(
		...Array.from({ length: totalPages }, (_, index) => pageItem(index + 1, current))
	)

	previous.disabled = current === 1
	previous.dataset.page = String(current - 1)
	next.disabled = current === totalPages
	next.dataset.page = String(current + 1)
	nav.hidden = totalPages <= 1

	return current
}
