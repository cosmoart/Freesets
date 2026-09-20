import { readFileSync } from 'node:fs'
import type { APIRoute, GetStaticPaths } from 'astro'
import categories from '@/assets/categories'
import type { Category } from '@/types'

export const getStaticPaths = (() =>
	categories.map((category) => ({
		params: { category: category.nameID },
		props: { category }
	}))) satisfies GetStaticPaths

export const GET: APIRoute = ({ props }) => {
	const { category } = props as { category: Category }
	const source = readFileSync(`public/categories-icons/${category.nameID}.svg`, 'utf-8')

	const inner = source.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
	<circle cx="32" cy="32" r="32" fill="${category.color}" />
	<svg x="8" y="8" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner.replaceAll('currentColor', '#fff')}</svg>
</svg>`

	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
}
