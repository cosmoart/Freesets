import { terms } from '@/scripts/filter'

export interface EmptyFilter {
	/** Shown inside the button, e.g. `Remove "CC0"`. */
	label: string
	/** How many resources come back once this filter is dropped. */
	count: number
	clear: () => void
}

export interface EmptyContext {
	query: string
	/** Where the closest matches were looked up, e.g. "Icons". */
	scope: string
	/** Active filters that would widen the search, in any order. */
	filters?: EmptyFilter[]
	/** Best partial matches, already ranked. Read for their data-label/link/meta. */
	closest?: HTMLElement[]
	/** Re-runs the search with a single term. */
	onTerm?: (term: string) => void
}

const COUNTS = ['No', 'One', 'Two', 'Three']

const count = (value: number) => COUNTS[value] ?? String(value)

function hint({ query, filters = [] }: EmptyContext) {
	const widest = filters.filter((filter) => filter.count > 0).sort((a, b) => b.count - a.count)[0]

	if (widest) {
		const plural = filters.length === 1 ? 'filter is' : 'filters are'
		const resources = widest.count === 1 ? 'resource' : 'resources'
		const subject = query ? `“${query}” returns` : 'That leaves'

		return `${count(filters.length)} ${plural} narrowing this a lot. ${subject} ${widest.count} ${resources} with the ${widest.label} filter removed.`
	}

	if (query) return `Nothing here matches “${query}”, not even partially.`

	return 'Nothing matches the filters you picked.'
}

// Only the fixed chrome is markup; every value below is assigned, never interpolated.
const CARD = `
	<a
		target="_blank"
		rel="noopener noreferrer nofollow"
		class="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
	>
		<img
			alt=""
			width="36"
			height="36"
			loading="lazy"
			class="size-9 shrink-0 rounded-md object-cover"
		/>
		<span class="min-w-0">
			<span class="block truncate font-medium"></span>
			<span class="block truncate text-xs text-zinc-500"></span>
		</span>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="ml-auto size-4 shrink-0 text-zinc-400"
		>
			<path d="M7 17 17 7M9 7h8v8" />
		</svg>
	</a>
`

function card(item: HTMLElement) {
	const link = item.dataset.link ?? ''
	const li = document.createElement('li')
	li.innerHTML = CARD

	li.querySelector('a')!.href = link
	li.querySelector('img')!.src =
		`https://www.google.com/s2/favicons?domain=${encodeURIComponent(link)}&sz=128`

	const [name, meta] = li.querySelectorAll('span > span')
	name!.textContent = item.dataset.label ?? ''
	meta!.textContent = item.dataset.meta ?? ''

	return li
}

export function renderEmpty(root: HTMLElement, context: EmptyContext) {
	const { query, scope, filters = [], closest = [], onTerm } = context

	root.querySelector<HTMLElement>('[data-empty-hint]')!.textContent = hint(context)

	const remove = root.querySelector<HTMLButtonElement>('[data-empty-remove]')!
	const widest = filters.filter((filter) => filter.count > 0).sort((a, b) => b.count - a.count)[0]

	remove.hidden = !widest
	if (widest) {
		remove.textContent = `Remove “${widest.label}”`
		remove.onclick = widest.clear
	}

	const all = root.querySelector<HTMLAnchorElement>('[data-empty-all]')!
	all.href = query ? `/search?q=${encodeURIComponent(query)}` : '/search'

	const suggestions = root.querySelector<HTMLElement>('[data-empty-terms]')!
	const words = terms(query)

	suggestions.replaceChildren()
	suggestions.hidden = words.length < 2 || !onTerm

	if (!suggestions.hidden) {
		const label = document.createElement('span')
		label.textContent = 'Or try'
		suggestions.append(label)

		for (const word of words) {
			const button = document.createElement('button')
			button.type = 'button'
			button.textContent = word
			button.className =
				'cursor-pointer underline underline-offset-4 transition-colors hover:text-zinc-950 dark:hover:text-white'
			button.addEventListener('click', () => onTerm!(word))
			suggestions.append(button)
		}
	}

	const section = root.querySelector<HTMLElement>('[data-empty-closest]')!
	section.hidden = closest.length === 0

	if (!section.hidden) {
		root.querySelector<HTMLElement>('[data-empty-closest-title]')!.textContent =
			`Closest in ${scope}`
		root.querySelector<HTMLElement>('[data-empty-closest-note]')!.textContent =
			filters.length > 0 ? 'Ignoring filters' : 'Partial matches'
		root
			.querySelector<HTMLElement>('[data-empty-closest-list]')!
			.replaceChildren(...closest.map(card))
	}
}

/** Items sharing at least one term with the query, best overlap first. */
export function closestTo(items: HTMLElement[], query: string, limit = 3) {
	const words = terms(query)
	if (words.length === 0) return []

	return items
		.map((item) => ({
			item,
			score: words.filter((word) => (item.dataset.text ?? '').includes(word)).length
		}))
		.filter((entry) => entry.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((entry) => entry.item)
}
