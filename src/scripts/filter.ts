export function terms(query: string) {
	return query.toLowerCase().split(' ').filter(Boolean)
}

export function matches(text: string, query: string) {
	return terms(query).every((term) => text.includes(term))
}
