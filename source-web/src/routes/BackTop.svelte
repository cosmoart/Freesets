<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('scroll', () =>
			document
				.querySelector('#topArrow')
				.classList[scrollY >= 400 ? 'add' : 'remove']('!opacity-100', '!translate-y-0')
		);
	});
</script>

<button
	on:click={() => scroll(0, 0)}
	id="topArrow"
	class="bg-zinc-800 p-2 rounded-full fixed bottom-6 right-6 transition-all opacity-0 translate-y-12 hover:opacity-80 hover:scale-105 active:scale-95 shadow-md"
	title="Back to top"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-[32px] h-[32px] stroke-2"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		><circle cx="12" cy="12" r="10" /><polyline points="16 12 12 8 8 12" /><line
			x1="12"
			y1="16"
			x2="12"
			y2="8"
		/></svg
	>
</button>
