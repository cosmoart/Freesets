/** Pills that fit one row in a card's corner before the rest collapse into a "+N" chip. */
const MAX_TAGS = 3

/**
 * Splits a resource's tags into the ones a card shows and the ones its counter stands for, so the
 * row never wraps over the preview. The counter takes a slot of its own, hence MAX_TAGS - 1.
 */
export function splitTags(tags: string[]) {
	if (tags.length <= MAX_TAGS) return { shown: tags, rest: [] }

	return { shown: tags.slice(0, MAX_TAGS - 1), rest: tags.slice(MAX_TAGS - 1) }
}
