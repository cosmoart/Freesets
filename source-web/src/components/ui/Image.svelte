<script>
	import { afterUpdate } from 'svelte';
	export let src;
	export let lazy = true;

	export let alt = 'image';
	export let className = '';
	export let height = '0';
	export let width = '0';

	let imgNode;

	afterUpdate(() => {
		if (!lazy) return;
		const lazyImgsObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const lazyImg = entry.target;
					lazyImg.src = lazyImg.dataset.src;
					lazyImg.classList.remove('lazyImg');
					lazyImgsObserver.unobserve(lazyImg);
				}
			});
		});
		lazyImgsObserver.observe(imgNode);
		return () => lazyImgsObserver.disconnect();
	});
</script>

{#if lazy}
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="/placeholder-dark.svg" />
		<img
			bind:this={imgNode}
			data-src={src}
			src="/placeholder.svg"
			{alt}
			class={className}
			{height}
			{width}
		/>
	</picture>
{:else}
	<img
		bind:this={imgNode}
		src={src}
		{alt}
		class={className}
		{height}
		{width}
	/>
{/if}
