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

let commit: Promise<{ sha: string; date: string } | null> | undefined

export function getLatestCommit() {
	commit ??= fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
		headers: { Accept: 'application/vnd.github+json' }
	})
		.then((response) => (response.ok ? response.json() : null))
		.then((data) => {
			const latest = data?.[0]
			if (!latest?.sha) return null

			return {
				sha: latest.sha as string,
				date: (latest.commit?.committer?.date ?? latest.commit?.author?.date) as string
			}
		})
		.catch(() => null)

	return commit
}
