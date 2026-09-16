import type { Asset, Category } from '@/types'
import categories from '@/assets/categories'

export const RECENT_DAYS = 30
const RECENT_LIMIT = 8

interface RecentEntry {
	asset: Asset
	category: Category
}

/**
 * Assets added inside the last {@link RECENT_DAYS} days, newest first.
 *
 * `added` is optional because no entry carries a date yet, so `dated` reports whether the real
 * time window produced this list. When it did not, we fall back to the same recency proxy the
 * "Newest" sort uses — a higher `id` means a later addition — picking round-robin across
 * categories so a single large category cannot take over the whole row.
 */
export function recentlyAdded(limit = RECENT_LIMIT): { dated: boolean; entries: RecentEntry[] } {
	const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000

	const dated = categories
		.flatMap((category) => category.assets.map((asset) => ({ asset, category })))
		.filter(({ asset }) => {
			const time = asset.added ? Date.parse(asset.added) : Number.NaN
			return !Number.isNaN(time) && time >= cutoff
		})
		.sort((a, b) => Date.parse(b.asset.added!) - Date.parse(a.asset.added!))

	if (dated.length > 0) return { dated: true, entries: dated.slice(0, limit) }

	const queues = categories.map((category) => ({
		category,
		assets: category.assets.slice().sort((a, b) => b.id - a.id)
	}))

	const entries: RecentEntry[] = []

	for (let round = 0; entries.length < limit; round++) {
		const available = queues.filter((queue) => queue.assets.length > round)
		if (available.length === 0) break

		for (const { category, assets } of available) {
			if (entries.length === limit) break
			entries.push({ asset: assets[round], category })
		}
	}

	return { dated: false, entries }
}

/**
 * Keys of the resources listed in "Recently added", so their cards carry the New badge wherever
 * they show up. Ids repeat across categories, so each key carries its category.
 */
export function recentKeys() {
	const { entries } = recentlyAdded()

	return new Set(entries.map(({ asset, category }) => `${category.nameID}:${asset.id}`))
}
