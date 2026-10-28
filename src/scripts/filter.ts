/**
 * Text as people mean it when they paste it: zero-width spaces separate words, the other zero-width
 * characters join them, and any run of whitespace (nonbreaking, tabs, newlines) is a single space.
 */
export function tidy(text: string) {
	return text
		.replace(/\u200b/g, ' ')
		.replace(/\u200c|\u200d|\u2060|\ufeff/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

/** The lowercased text a resource is searched by, normalized the same way as queries. */
export function searchText(...parts: (string | undefined)[]) {
	return tidy(parts.filter(Boolean).join(' ')).toLowerCase()
}

export function terms(query: string) {
	return searchText(query).split(' ').filter(Boolean)
}

/** Whether `text` (from `searchText`) contains every one of `words` (from `terms`). */
export function matches(text: string, words: string[]) {
	return words.every((word) => text.includes(word))
}

/** A link the way people type it when searching: no protocol, no "www.", no trailing slash. */
export function domainOf(link: string) {
	return link
		.toLowerCase()
		.replace(/^https?:\/\//, '')
		.replace(/^www\./, '')
		.replace(/\/+$/, '')
}
