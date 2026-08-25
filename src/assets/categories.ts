import type { Asset, Category } from '@/types'

import iconsDB from '@/assets/db/icons.json'
import illustrationsDB from '@/assets/db/illustrations.json'
import photosDB from '@/assets/db/photos.json'
import videosDB from '@/assets/db/videos.json'
import colorsDB from '@/assets/db/colors.json'
import backgroundsDB from '@/assets/db/backgrounds.json'
import typographyDB from '@/assets/db/typography.json'
import threeDB from '@/assets/db/3d.json'
import librariesDB from '@/assets/db/libraries.json'
import blogsDB from '@/assets/db/blogs.json'
import toolsDB from '@/assets/db/tools.json'
import inspirationsDB from '@/assets/db/inspirations.json'
import componentsDB from '@/assets/db/components.json'

const byOrder = (db: unknown[]): Asset[] =>
	(db as Asset[]).slice().sort((a, b) => b.order - a.order)

const categories: Category[] = [
	{ name: 'Icons', color: '#2b6dff', nameID: 'icons', assets: byOrder(iconsDB) },
	{
		name: 'Illustrations',
		color: '#20c928',
		nameID: 'illustrations',
		assets: byOrder(illustrationsDB)
	},
	{ name: 'Photos', color: '#d41cf1', nameID: 'photos', assets: byOrder(photosDB) },
	{ name: 'Videos', color: '#ef2350', nameID: 'videos', assets: byOrder(videosDB) },
	{ name: 'Colors', color: '#ff36a2', nameID: 'colors', assets: byOrder(colorsDB) },
	{ name: 'Backgrounds', color: '#5345f7', nameID: 'backgrounds', assets: byOrder(backgroundsDB) },
	{ name: 'Typography', color: '#ffaa1b', nameID: 'typography', assets: byOrder(typographyDB) },
	{ name: '3D', color: '#8935ff', nameID: '3d', assets: byOrder(threeDB) },
	{ name: 'Libraries', color: '#ff006e', nameID: 'libraries', assets: byOrder(librariesDB) },
	{ name: 'Blogs', color: '#00a1ff', nameID: 'blogs', assets: byOrder(blogsDB) },
	{ name: 'Tools', color: '#f97316', nameID: 'tools', assets: byOrder(toolsDB) },
	{
		name: 'Inspirations',
		color: '#6366f1',
		nameID: 'inspirations',
		assets: byOrder(inspirationsDB)
	},
	{ name: 'Components', color: '#21c95f', nameID: 'components', assets: byOrder(componentsDB) }
]

export default categories
