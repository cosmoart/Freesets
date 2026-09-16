import { DEFAULT_PER_PAGE } from '@/scripts/view'

// Phones get a shorter strip so the pagination fits on the same row as the page-size select.
const compact = matchMedia('(width < 40rem)')
const visiblePages = () => (compact.matches ? 3 : 5)
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

/**
 * Eases freshly rendered results in from the side the visitor is paging towards: 1 for next,
 * -1 for back. With 0 (a page-size change that stays on the same page) it only fades.
 */
function animateResults(direction: number) {
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

	// The nav remembers the page and page size it last showed, so only a real change of either
	// animates the results; filtering that stays on the same page swaps them without a flash.
	const [lastPage = 0, lastPerPage = 0] = (nav.dataset.shown ?? '').split('/').map(Number)
	nav.dataset.shown = `${current}/${perPage}`
	nav.dataset.total = String(total)
	if (lastPage && (lastPage !== current || lastPerPage !== perPage)) {
		animateResults(Math.sign(current - lastPage))
	}

	const pages = nav.querySelector<HTMLUListElement>('[data-pages]')!
	const first = nav.querySelector<HTMLButtonElement>('[data-page-first]')!
	const last = nav.querySelector<HTMLButtonElement>('[data-page-last]')!

	// The current page sits in the middle of the strip, sliding to either end near the first and
	// last pages so the strip stays full instead of leaving blanks around it.
	const visible = visiblePages()
	const from = Math.max(
		1,
		Math.min(current - Math.floor((visible - 1) / 2), totalPages - visible + 1)
	)
	const to = Math.min(totalPages, from + visible - 1)

	pages.replaceChildren(
		...Array.from({ length: to - from + 1 }, (_, index) => pageItem(from + index, current))
	)

	first.disabled = current === 1
	first.dataset.page = '1'
	last.disabled = current === totalPages
	last.dataset.page = String(totalPages)
	// "1–40 of 150" beside the page-size select; the end is capped so the last page and
	// "Show all" read correctly.
	const range = nav.closest('[data-results-bar]')?.querySelector<HTMLElement>('[data-range]')
	if (range) {
		const start = (current - 1) * perPage
		const end = Math.min(start + perPage, total)
		range.textContent = total === 0 ? '0 of 0' : `${start + 1}–${end} of ${total}`
	}

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

// Crossing the phone breakpoint (a rotation or resize) redraws each strip from what it last showed.
// Same page and page size, so the results don't animate.
compact.addEventListener('change', () => {
	for (const nav of document.querySelectorAll<HTMLElement>('[data-pagination][data-total]')) {
		const [page = 1, perPage = DEFAULT_PER_PAGE] = (nav.dataset.shown ?? '').split('/').map(Number)
		renderPages(nav, Number(nav.dataset.total), page, perPage)
	}
})
