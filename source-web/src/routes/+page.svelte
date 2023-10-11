<script>
	import iconsJson from '@/assets/data/icons.json';
	import ilustrationsJson from '@/assets/data/ilustrations.json';
	import loadersJson from '@/assets/data/loaders.json';
	import photosJson from '@/assets/data/photos.json';
	import backgroundsJson from '@/assets/data/backgrounds.json';
	import videosJson from '@/assets/data/videos.json';
	import colorsJson from '@/assets/data/colors.json';
	import fontsJson from '@/assets/data/fonts.json';
	import chartsJson from '@/assets/data/charts.json';
	import blogsJson from '@/assets/data/blogs.json';

	import Cards from './Cards.svelte';
	import BackTop from './BackTop.svelte';
	import NavBar from './NavBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const categories = [
		{
			name: 'Icons',
			items: iconsJson,
			color: '#2563eb'
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
			color: '#f43f5e'
		},
		{
			name: 'Backgrounds',
			items: backgroundsJson,
			color: '#4338ca'
		},
		{
			name: 'Videos',
			items: videosJson,
			color: '#e11d48'
		},
		{
			name: 'Colors',
			items: colorsJson,
			color: '#ea580c'
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
		}
	];

	let categoryQ = 'all';

	onMount(() => (categoryQ = $page.url.searchParams.get('category') ?? 'all'));

	// Every time that categoryQ changues: set the url query param
	$: {
		$page.url.searchParams.set('category', categoryQ);
	}

	$: console.log(categoryQ);

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
	<NavBar {categories} {categoryQ} />
	<Cards {categoriesFiltered} />
	<BackTop />
</section>
