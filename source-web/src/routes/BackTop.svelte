<script>
	import { onMount } from 'svelte';
	import BackArrowIcon from '@/assets/icons/backArrow.svg';

	onMount(() => {
		document.addEventListener('scroll', () =>
			document
				.querySelector('#topArrow')
				.classList[scrollY >= window.innerHeight / 2 ? 'add' : 'remove'](
					'!opacity-100',
					'!translate-y-0'
				)
		);
	});
</script>

<button
	on:click={() => scroll(0, 0)}
	id="topArrow"
	class="dark:bg-zinc-800 ring-2 ring-zinc-900 dark:ring-white z-50 bg-white p-1.5 rounded-full fixed bottom-5 left-5 transition-all opacity-0 translate-y-12 hover:opacity-80 hover:scale-105 active:scale-95 shadow-md"
	title="Back to top"
>
	<img src={BackArrowIcon} alt="" class="w-7 dark:invert" />
</button>
