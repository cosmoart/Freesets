import type { SearchEntry } from '@/scripts/search-index'

/** AssetCard rendered inside <template> tags, once with a license link and once without. */
export interface CardTemplates {
	link: HTMLTemplateElement
	plain: HTMLTemplateElement
}

function host(link: string) {
	try {
		return new URL(link).hostname.replace(/^www\./, '')
	} catch {
		return link
	}
}

/**
 * Builds the card AssetCard.astro renders, filled with one index entry. The markup comes from the
 * template and every value is assigned through the DOM, never interpolated as HTML.
 *
 * The clone stays in the template's inert document until the caller appends it, so no image
 * starts loading before its final src and loading mode are set.
 */
export function renderCard(templates: CardTemplates, entry: SearchEntry, priority = false) {
	const template = entry.licenseLink ? templates.link : templates.plain
	const item = template.content.firstElementChild!.cloneNode(true) as HTMLElement
	const hook = <T extends HTMLElement = HTMLElement>(name: string) =>
		item.querySelector<T>(`[data-card-${name}]`)!

	item.querySelector('article')!.style.setProperty('--card-color', entry.color)

	const link = hook<HTMLAnchorElement>('link')
	link.href = entry.link
	link.setAttribute('aria-label', `Open ${entry.name}`)

	hook('preview').toggleAttribute('data-broken', !entry.img)

	const preview = hook<HTMLImageElement>('img')
	if (priority) {
		preview.loading = 'eager'
		preview.setAttribute('fetchpriority', 'high')
	}
	preview.src = entry.img
	preview.alt = `${entry.name} web preview`

	for (const favicon of item.querySelectorAll<HTMLImageElement>('[data-card-favicon]')) {
		favicon.src = `https://www.google.com/s2/favicons?domain=${entry.link}&sz=128`
	}

	hook('host').textContent = host(entry.link)
	hook('label').textContent = entry.category
	hook('name').textContent = entry.name

	const tags = hook('tags')
	const tag = tags.firstElementChild!
	tags.replaceChildren(
		...entry.tags.map((text) => {
			const clone = tag.cloneNode() as HTMLElement
			clone.textContent = text
			return clone
		})
	)
	if (entry.tags.length === 0) tags.remove()

	const license = hook('license')
	if (entry.license) {
		license.textContent = entry.license
		if (entry.licenseDescription) license.title = entry.licenseDescription
		if (entry.licenseLink) (license as HTMLAnchorElement).href = entry.licenseLink
	} else {
		license.remove()
	}

	return item
}
