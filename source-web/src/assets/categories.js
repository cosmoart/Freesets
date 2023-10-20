import ilustrationsJson from '@/assets/data/ilustrations.json';
import uiCollectionsJson from '@/assets/data/ui-collections.json';
import backgroundsJson from '@/assets/data/backgrounds.json';
import iconsJson from '@/assets/data/icons.json';
import loadersJson from '@/assets/data/loaders.json';
import photosJson from '@/assets/data/photos.json';
import videosJson from '@/assets/data/videos.json';
import colorsJson from '@/assets/data/colors.json';
import fontsJson from '@/assets/data/fonts.json';
import chartsJson from '@/assets/data/charts.json';
import blogsJson from '@/assets/data/blogs.json';

export default [
	{
		name: 'Icons',
		items: iconsJson,
		color: '#2563eb',
	},
	{
		name: 'Ilustrations',
		items: ilustrationsJson,
		color: '#22c55e'
	},
	{
		name: 'Loaders',
		items: loadersJson,
		color: '#f97316'
	},
	{
		name: 'Photos',
		items: photosJson,
		color: '#d41cf1'
	},
	{
		name: 'Backgrounds',
		items: backgroundsJson,
		color: '#4c3fed'
	},
	{
		name: 'Videos',
		items: videosJson,
		color: '#e11d48'
	},
	{
		name: 'Colors',
		items: colorsJson,
		color: '#f721a8'
	},
	{
		name: 'Fonts',
		items: fontsJson,
		color: '#f59e0b'
	},
	{
		name: 'Charts',
		items: chartsJson,
		color: '#10b981'
	},
	{
		name: 'Blogs',
		items: blogsJson,
		color: '#3b82f6'
	},
	{
		name: "UI collections",
		items: uiCollectionsJson,
		color: '#6366f1',
	}
];