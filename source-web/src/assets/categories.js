import ilustrationsJson from '@/assets/data/ilustrations.json';
import uiCollectionsJson from '@/assets/data/ui-collections.json';
import backgroundsJson from '@/assets/data/backgrounds.json';
import iconsJson from '@/assets/data/icons.json';
import toolsJson from '@/assets/data/tools.json';
import photosJson from '@/assets/data/photos.json';
import videosJson from '@/assets/data/videos.json';
import colorsJson from '@/assets/data/colors.json';
import fontsJson from '@/assets/data/fonts.json';
import librariesJson from '@/assets/data/libraries.json';
import blogsJson from '@/assets/data/blogs.json';
import threeDJson from '@/assets/data/3d.json';
import componentsJson from '@/assets/data/components.json';

export default [
	{
		name: 'Icons',
		items: iconsJson,
		color: '#2b6dff',
		nameID: 'icons',
	},
	{
		name: 'Ilustrations',
		items: ilustrationsJson,
		color: '#20c928',
		nameID: 'ilustrations',
	},
	{
		name: 'Photos',
		items: photosJson,
		color: '#d41cf1',
		nameID: 'photos',
	},
	{
		name: 'Videos',
		items: videosJson,
		color: '#e11d48',
		nameID: 'videos',
	},
	{
		name: 'Colors',
		items: colorsJson,
		color: '#fd1793',
		nameID: 'colors',
	},
	{
		name: 'Backgrounds',
		items: backgroundsJson,
		color: '#4c3fed',
		nameID: 'backgrounds',
	},
	{
		name: 'Fonts',
		items: fontsJson,
		color: '#ffaa1b',
		nameID: 'fonts',
	},
	{
		name: "3D",
		items: threeDJson,
		color: '#8338ec',
		nameID: '3d',
	},
	{
		name: 'Libraries',
		items: librariesJson,
		color: '#ff006e',
		nameID: 'libraries',
	},
	{
		name: 'Blogs',
		items: blogsJson,
		color: '#00a1ff',
		nameID: 'blogs',
	},
	{
		name: 'Tools',
		items: toolsJson,
		color: '#f97316',
		nameID: 'tools',
	},
	{
		name: "UI collections",
		items: uiCollectionsJson,
		color: '#6366f1',
		nameID: 'ui-collections',
	},
	{
		name: "Components",
		items: componentsJson,
		color: '#13c153',
		nameID: 'components',
	},
];