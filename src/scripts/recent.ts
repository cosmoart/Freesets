import type { Asset, Category } from '@/types'
import categories from '@/assets/categories'

const RECENT_LIMIT = 8
const NEW_WINDOW_DAYS = 14

interface RecentEntry {
	asset: Asset
	category: Category
}

/**
 * The newest assets, whenever they were added.
 *
 * `added` is optional because no entry carries a date yet, so we only use the dates when at least
 * one exists. Otherwise we fall back to the same recency proxy the "Newest" sort uses — a higher
 * `id` means a later addition — picking round-robin across categories so a single large category
 * cannot take over the whole row.
 */
export function recentlyAdded(limit = RECENT_LIMIT): { dated: boolean; entries: RecentEntry[] } {
	const dated = categories
		.flatMap((category) => category.assets.map((asset) => ({ asset, category })))
		.filter(({ asset }) => asset.added && !Number.isNaN(Date.parse(asset.added)))
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
 * Keys of the resources added within the last `NEW_WINDOW_DAYS` days, so their cards carry the New
 * badge wherever they show up. Ids repeat across categories, so each key carries its category.
 *
 * The window is measured at build time, and an asset without a valid `added` date never qualifies.
 */
export function recentKeys(days = NEW_WINDOW_DAYS) {
	const cutoff = Date.now() - days * 24 * 60 * 60 * 1000

	return new Set(
		categories.flatMap((category) =>
			category.assets
				.filter((asset) => {
					const added = asset.added ? Date.parse(asset.added) : NaN
					return !Number.isNaN(added) && added >= cutoff
				})
				.map((asset) => `${category.nameID}:${asset.id}`)
		)
	)
}
