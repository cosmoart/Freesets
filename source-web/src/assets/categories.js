import iconsDB from '@/assets/db/icons.json'
import ilustrationsDB from '@/assets/db/ilustrations.json'
import photosDB from '@/assets/db/photos.json'
import videosDB from '@/assets/db/videos.json'
import colorsDB from '@/assets/db/colors.json'
import backgroundsDB from '@/assets/db/backgrounds.json'
import fontsDB from '@/assets/db/fonts.json'
import threeDB from '@/assets/db/3d.json'
import librariesDB from '@/assets/db/libraries.json'
import blogsDB from '@/assets/db/blogs.json'
import toolsDB from '@/assets/db/tools.json'
import UICollectionsDB from '@/assets/db/ui-collections.json'
import componentsDB from '@/assets/db/components.json'

export default [
	{
		name: 'Icons',
		color: '#2b6dff',
		nameID: 'icons',
		assets: iconsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Ilustrations',
		color: '#20c928',
		nameID: 'ilustrations',
		assets: ilustrationsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Photos',
		color: '#d41cf1',
		nameID: 'photos',
		assets: photosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Videos',
		color: '#e11d48',
		nameID: 'videos',
		assets: videosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Colors',
		color: '#fd1793',
		nameID: 'colors',
		assets: colorsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Backgrounds',
		color: '#4c3fed',
		nameID: 'backgrounds',
		assets: backgroundsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Fonts',
		color: '#ffaa1b',
		nameID: 'fonts',
		assets: fontsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: '3D',
		color: '#8338ec',
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
		name: 'UI collections',
		color: '#6366f1',
		nameID: 'ui-collections',
		assets: UICollectionsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Components',
		color: '#13c153',
		nameID: 'components',
		assets: componentsDB.sort((a, b) => b.order - a.order)
	}
]
