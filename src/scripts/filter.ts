export function terms(query: string) {
	return query.toLowerCase().split(' ').filter(Boolean)
}

export function matches(text: string, query: string) {
	return terms(query).every((term) => text.includes(term))
}

/** A link the way people type it when searching: no protocol, no "www.", no trailing slash. */
export function domainOf(link: string) {
	return link
		.toLowerCase()
		.replace(/^https?:\/\//, '')
		.replace(/^www\./, '')
		.replace(/\/+$/, '')
}
