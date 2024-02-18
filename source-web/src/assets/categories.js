import iconsDB from './db/icons.json' with {type: "json"}
import ilustrationsDB from './db/ilustrations.json' with {type: "json"}
import photosDB from './db/photos.json' with {type: "json"}
import videosDB from './db/videos.json' with {type: "json"}
import colorsDB from './db/colors.json' with {type: "json"}
import backgroundsDB from './db/backgrounds.json' with {type: "json"}
import fontsDB from './db/fonts.json' with {type: "json"}
import threeDB from './db/3d.json' with {type: "json"}
import librariesDB from './db/libraries.json' with {type: "json"}
import blogsDB from './db/blogs.json' with {type: "json"}
import toolsDB from './db/tools.json' with {type: "json"}
import UICollectionsDB from './db/ui-collections.json' with {type: "json"}
import componentsDB from './db/components.json' with {type: "json"}
// import iconsDB from '@/assets/db/icons.json'
// import ilustrationsDB from '@/assets/db/ilustrations.json'
// import photosDB from '@/assets/db/photos.json'
// import videosDB from '@/assets/db/videos.json'
// import colorsDB from '@/assets/db/colors.json'
// import backgroundsDB from '@/assets/db/backgrounds.json'
// import fontsDB from '@/assets/db/fonts.json'
// import threeDB from '@/assets/db/3d.json'
// import librariesDB from '@/assets/db/libraries.json'
// import blogsDB from '@/assets/db/blogs.json'
// import toolsDB from '@/assets/db/tools.json'
// import UICollectionsDB from '@/assets/db/ui-collections.json'
// import componentsDB from '@/assets/db/components.json'

export default [
	{
		name: 'Icons',
		color: '#2b6dff',
		nameID: 'icons',
		items: iconsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Ilustrations',
		color: '#20c928',
		nameID: 'ilustrations',
		items: ilustrationsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Photos',
		color: '#d41cf1',
		nameID: 'photos',
		items: photosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Videos',
		color: '#e11d48',
		nameID: 'videos',
		items: videosDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Colors',
		color: '#fd1793',
		nameID: 'colors',
		items: colorsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Backgrounds',
		color: '#4c3fed',
		nameID: 'backgrounds',
		items: backgroundsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Fonts',
		color: '#ffaa1b',
		nameID: 'fonts',
		items: fontsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: '3D',
		color: '#8338ec',
		nameID: '3d',
		items: threeDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Libraries',
		color: '#ff006e',
		nameID: 'libraries',
		items: librariesDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Blogs',
		color: '#00a1ff',
		nameID: 'blogs',
		items: blogsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Tools',
		color: '#f97316',
		nameID: 'tools',
		items: toolsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'UI collections',
		color: '#6366f1',
		nameID: 'ui-collections',
		items: UICollectionsDB.sort((a, b) => b.order - a.order)
	},
	{
		name: 'Components',
		color: '#13c153',
		nameID: 'components',
		items: componentsDB.sort((a, b) => b.order - a.order)
	}
]
