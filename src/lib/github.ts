export const REPO = 'cosmoart/Freesets'

let request: Promise<number | null> | undefined

export function getStars() {
	request ??= fetch(`https://api.github.com/repos/${REPO}`, {
		headers: { Accept: 'application/vnd.github+json' }
	})
		.then((response) => (response.ok ? response.json() : null))
		.then((data) => data?.stargazers_count ?? null)
		.catch(() => null)

	return request
}

export function formatStars(value: number) {
	return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
		value
	)
}
