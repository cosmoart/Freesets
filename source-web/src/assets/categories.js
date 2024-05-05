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

export default [
	{
		name: 'Icons',
		color: '#2b6dff',
		nameID: 'icons',
		assets: iconsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Illustrations',
		color: '#20c928',
		nameID: 'illustrations',
		assets: illustrationsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Photos',
		color: '#d41cf1',
		nameID: 'photos',
		assets: photosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Videos',
		color: '#ef2350',
		nameID: 'videos',
		assets: videosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Colors',
		color: '#ff36a2',
		nameID: 'colors',
		assets: colorsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Backgrounds',
		color: '#5345f7',
		nameID: 'backgrounds',
		assets: backgroundsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Typography',
		color: '#ffaa1b',
		nameID: 'typography',
		assets: typographyDB.sort((a, b) => b.order - a.order)
	},
	{
		name: '3D',
		color: '#8935ff',
		nameID: '3d',
		assets: threeDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Libraries',
		color: '#ff006e',
		nameID: 'libraries',
		assets: librariesDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Blogs',
		color: '#00a1ff',
		nameID: 'blogs',
		assets: blogsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Tools',
		color: '#f97316',
		nameID: 'tools',
		assets: toolsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Inspirations',
		color: '#6366f1',
		nameID: 'inspirations',
		assets: inspirationsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Components',
		color: '#21c95f',
		nameID: 'components',
		assets: componentsDB.sort((a, b) => b.order - a.order)
	}
]
