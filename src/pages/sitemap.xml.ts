import type { APIRoute } from 'astro'
import categories from '@/assets/categories'

// Every indexable page. The 404 and the /og screenshot page are left out on purpose.
export const GET: APIRoute = ({ site }) => {
	const paths = ['/', '/search', ...categories.map((category) => `/${category.nameID}`)]

	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${new URL(path, site).href}</loc>\n\t</url>`)
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
