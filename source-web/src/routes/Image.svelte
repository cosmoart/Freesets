<script>
	import { afterUpdate } from 'svelte';
	export let src;
	export let lazy = false;

	export let alt = 'image';
	export let className = '';
	export let height = '0';

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

<img
	bind:this={imgNode}
	data-src={src}
	src={lazy ? '/placeholder.gif' : src}
	{alt}
	class={className}
	{height}
/>
