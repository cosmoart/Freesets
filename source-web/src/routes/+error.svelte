<script>
	import arrowIcon from '@/assets/icons/arrow.svg';
</script>

<svelte:head>
	<title>404 Error - Freesets</title>
	<meta name="description" content="Collection of free assets for your projects" />
</svelte:head>

<section class="flex flex-col items-center justify-center flex-grow">
	<h1 class="text-6xl font-bold mb-1">404 Error</h1>
	<p class="text-2xl">Page not found</p>
	<a href="/" class="text-blue-500 hover:underline mt-3 flex text-xl items-center gap-2">
		<img src={arrowIcon} alt="" class="w-5 invert" />
		Go back home
	</a>
</section>
