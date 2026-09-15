import { DEFAULT_PER_PAGE } from '@/scripts/view'

const VISIBLE_PAGES = 5
const SLIDE_DISTANCE = 24

const ACTIVE = 'pointer-events-none border-ink bg-ink text-canvas'
const IDLE =
	'cursor-pointer border-line bg-field text-muted hover:border-line-strong hover:text-ink'

function pageItem(page: number, current: number) {
	const button = document.createElement('button')
	button.type = 'button'
	button.dataset.page = String(page)
	button.textContent = String(page)
	button.setAttribute('aria-label', `Go to page ${page}`)
	if (page === current) button.setAttribute('aria-current', 'page')
	button.className = `flex size-8 items-center justify-center rounded-lg border font-mono text-xs tabular-nums transition-colors ${
		page === current ? ACTIVE : IDLE
	}`

	const item = document.createElement('li')
	item.append(button)
	return item
}

/** Eases the results in from the side the visitor is paging towards: 1 for next, -1 for back. */
function slideResults(direction: number) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

	document.querySelector<HTMLElement>('[data-results]')?.animate(
		[
			{ opacity: 0, transform: `translateX(${direction * SLIDE_DISTANCE}px)` },
			{ opacity: 1, transform: 'none' }
		],
		{ duration: 280, easing: 'cubic-bezier(0.2, 0, 0, 1)' }
	)
}

/** Rebuilds the page buttons for `total` results and returns the page actually shown. */
export function renderPages(
	nav: HTMLElement,
	total: number,
	page: number,
	perPage: number = DEFAULT_PER_PAGE
) {
	const totalPages = Math.max(1, Math.ceil(total / perPage))
	const current = Math.min(Math.max(page, 1), totalPages)

	// The nav remembers the page it last showed, so only a real page change slides the results.
	const previous = Number(nav.dataset.current) || 0
	nav.dataset.current = String(current)
	if (previous && previous !== current) slideResults(Math.sign(current - previous))

	const pages = nav.querySelector<HTMLUListElement>('[data-pages]')!
	const first = nav.querySelector<HTMLButtonElement>('[data-page-first]')!
	const last = nav.querySelector<HTMLButtonElement>('[data-page-last]')!

	// The current page leads the row, so the strip stays full instead of leaving blanks around it.
	// Near the end it slides back to keep showing VISIBLE_PAGES buttons.
	const from = Math.max(1, Math.min(current, totalPages - VISIBLE_PAGES + 1))
	const to = Math.min(totalPages, from + VISIBLE_PAGES - 1)

	pages.replaceChildren(
		...Array.from({ length: to - from + 1 }, (_, index) => pageItem(from + index, current))
	)

	first.disabled = current === 1
	first.dataset.page = '1'
	last.disabled = current === totalPages
	last.dataset.page = String(totalPages)
	// Keep the nav's box so toggling it doesn't shift the surrounding layout
	nav.classList.toggle('invisible', totalPages <= 1)

	return current
}

/** Shows only the rendered `matches` that fall on the current page. */
export function paginate(
	nav: HTMLElement,
	matches: HTMLElement[],
	page: number,
	perPage: number = DEFAULT_PER_PAGE
) {
	const current = renderPages(nav, matches.length, page, perPage)
	const start = (current - 1) * perPage

	matches.forEach((item, index) => {
		item.hidden = index < start || index >= start + perPage
	})

	return current
}
