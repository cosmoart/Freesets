<script>
	import categories from '@/assets/categories.js';
	import Assets from './Assets.svelte';
</script>

<svelte:head>
	<title>Freesets</title>
	<link rel="icon" href="/favicon.svg" />
	<meta name="description" content="Collection of free assets for your projects" />
</svelte:head>

<section>
	<h1 class="hidden">Freesets</h1>
	<Assets {categories} />
</section>
