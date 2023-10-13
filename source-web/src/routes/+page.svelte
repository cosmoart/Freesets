<script>
	import categories from '@/assets/categories.js';
	import Cards from './Cards.svelte';
	import BackTop from './BackTop.svelte';
	import NavBar from './NavBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let categoryQ = 'all';

	onMount(() => (categoryQ = $page.url.searchParams.get('category') ?? 'all'));

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
	<NavBar {categories} bind:categoryQ />
	<Cards {categoriesFiltered} />
	<BackTop />
</section>
