import type { Asset, Category } from '@/types'

import iconsDB from '@/assets/db/icons.json'
import illustrationsDB from '@/assets/db/illustrations.json'
import photosDB from '@/assets/db/photos.json'
import videosDB from '@/assets/db/videos.json'
import colorsDB from '@/assets/db/colors.json'
import backgroundsDB from '@/assets/db/backgrounds.json'
import fontsDB from '@/assets/db/fonts.json'
import threeDB from '@/assets/db/3d.json'
import librariesDB from '@/assets/db/libraries.json'
import blogsDB from '@/assets/db/blogs.json'
import toolsDB from '@/assets/db/tools.json'
import inspirationsDB from '@/assets/db/inspirations.json'
import componentsDB from '@/assets/db/components.json'
import directoriesDB from '@/assets/db/directories.json'

const byOrder = (db: unknown[]): Asset[] =>
	(db as Asset[]).slice().sort((a, b) => b.order - a.order)

const categories: Category[] = [
	{
		name: 'Icons',
		headline: 'Free icon sets and icon libraries',
		description: 'Open-source icon sets, single-file libraries and animated packs.',
		color: '#2b6dff',
		nameID: 'icons',
		assets: byOrder(iconsDB)
	},
	{
		name: 'Illustrations',
		headline: 'Free illustrations and vector packs',
		description: 'Illustration packs, scenes and characters ready to drop into any project.',
		color: '#20c928',
		nameID: 'illustrations',
		assets: byOrder(illustrationsDB)
	},
	{
		name: 'Photos',
		headline: 'Free stock photos and public-domain images',
		description: 'Royalty-free photo libraries and public-domain archives.',
		color: '#d41cf1',
		nameID: 'photos',
		assets: byOrder(photosDB)
	},
	{
		name: 'Directories',
		headline: 'Directories of free design and dev resources',
		description: 'Other collections and directories of free resources.',
		color: '#14b8a6',
		nameID: 'directories',
		assets: byOrder(directoriesDB)
	},
	{
		name: 'Videos',
		headline: 'Free stock videos and motion backgrounds',
		description: 'Stock footage, loops and motion backgrounds you can use for free.',
		color: '#ef2350',
		nameID: 'videos',
		assets: byOrder(videosDB)
	},
		{
		name: 'Backgrounds',
		headline: 'Free backgrounds, patterns and gradients',
		description: 'Patterns, gradients, textures and generated backdrops.',
		color: '#5345f7',
		nameID: 'backgrounds',
		assets: byOrder(backgroundsDB)
	},
	{
		name: 'Colors',
		headline: 'Free color palette generators and tools',
		description: 'Palette generators, color pickers and contrast checkers.',
		color: '#ff36a2',
		nameID: 'colors',
		assets: byOrder(colorsDB)
	},
	{
		name: 'Fonts',
		headline: 'Free fonts and typography tools',
		description: 'Free font families, type foundries and pairing tools.',
		color: '#ffaa1b',
		nameID: 'fonts',
		assets: byOrder(fontsDB)
	},
	{
		name: 'Inspirations',
		headline: 'Web and UI design inspiration galleries',
		description: 'Galleries of well-crafted websites and interface design.',
		color: '#6366f1',
		nameID: 'inspirations',
		assets: byOrder(inspirationsDB)
	},
	{
		name: 'Components',
		headline: 'Free UI components and copy-paste blocks',
		description: 'Copy-paste UI components and ready-made blocks.',
		color: '#21c95f',
		nameID: 'components',
		assets: byOrder(componentsDB)
	},
		{
		name: 'Tools',
		headline: 'Free tools for designers and developers',
		description: 'Utilities that speed up everyday design and development work.',
		color: '#f97316',
		nameID: 'tools',
		assets: byOrder(toolsDB)
	},
		{
		name: 'Blogs',
		headline: 'Design and web development blogs',
		description: 'Blogs, newsletters and publications worth following.',
		color: '#00a1ff',
		nameID: 'blogs',
		assets: byOrder(blogsDB)
	},
		{
		name: '3D',
		headline: 'Free 3D models, materials and scenes',
		description: 'Free 3D models, materials and render-ready scenes.',
		color: '#8935ff',
		nameID: '3d',
		assets: byOrder(threeDB)
	},
		{
		name: 'Libraries',
		headline: 'Open-source UI libraries and frameworks',
		description: 'Open-source libraries and frameworks for building interfaces.',
		color: '#ff006e',
		nameID: 'libraries',
		assets: byOrder(librariesDB)
	}
]

export default categories
