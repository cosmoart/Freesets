<script>
	import iconsJson from '../assets/data/icons.json';
	import ilustrationsJson from '../assets/data/ilustrations.json';
	import loadersJson from '../assets/data/loaders.json';
	import photosJson from '../assets/data/photos.json';
	import backgroundsJson from '../assets/data/backgrounds.json';
	import videosJson from '../assets/data/videos.json';
	import colorsJson from '../assets/data/colors.json';
	import fontsJson from '../assets/data/fonts.json';
	import Cards from './Cards.svelte';
	import BackTop from './BackTop.svelte';

	import { page } from '$app/stores';
	import NavBar from './NavBar.svelte';

	const categories = [
		{
			name: 'Icons',
			items: iconsJson,
			icon: 'icons',
			color: 'bg-blue-600'
		},
		{
			name: 'Ilustrations',
			items: ilustrationsJson,
			icon: 'ilustrations',
			color: 'bg-green-600'
		},
		{
			name: 'Loaders',
			items: loadersJson,
			icon: 'loaders',
			color: 'bg-red-600'
		},
		{
			name: 'Photos',
			items: photosJson,
			icon: 'photos',
			color: 'bg-yellow-500'
		},
		{
			name: 'Backgrounds',
			items: backgroundsJson,
			icon: 'backgrounds',
			color: 'bg-purple-600'
		},
		{
			name: 'Videos',
			items: videosJson,
			icon: 'videos',
			color: 'bg-pink-600'
		},
		{
			name: 'Colors',
			items: colorsJson,
			icon: 'colors',
			color: 'bg-indigo-600'
		},
		{
			name: 'Fonts',
			items: fontsJson,
			icon: 'fonts',
			color: 'bg-gray-600'
		}
	];

	let categoryQ = $page.url.searchParams.get('category') ?? 'all';

	const setCategory = (cat) => {
		categoryQ = cat.toLowerCase();
		const params = new URLSearchParams(window.location.search);
		params.set('category', categoryQ);
		window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
	};

	$: categoriesFiltered = categories.filter((cat) => {
		if (categoryQ === 'all') return true;
		return cat.name.toLowerCase() === categoryQ;
	});
</script>

<svelte:head>
	<title>Freesets</title>
	<meta name="description" content="Collection of free assets for your projects" />
</svelte:head>

<section>
	<h1 class="text-xl hidden">Freesets</h1>

	<NavBar {categories} {categoryQ} {setCategory} />
	<Cards {categoriesFiltered} />
	<BackTop />
</section>
