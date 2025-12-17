<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let src;
	export let lazy = true;
	export let alt = 'image';
	export let className = '';
	export let height = '0';
	export let width = '0';

	// Optimized SVG Data URIs (8-dot fade animation)
	const PLACEHOLDER_LIGHT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%233b82f6'%3E%3Ccircle cx='50' cy='20' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='73.5' cy='26.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.15s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='80' cy='50' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.3s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='73.5' cy='73.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.45s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='50' cy='80' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.6s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='26.5' cy='73.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.75s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='20' cy='50' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.9s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='26.5' cy='26.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='1.05s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E";
	const PLACEHOLDER_DARK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%2360a5fa'%3E%3Ccircle cx='50' cy='20' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='73.5' cy='26.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.15s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='80' cy='50' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.3s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='73.5' cy='73.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.45s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='50' cy='80' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.6s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='26.5' cy='73.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.75s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='20' cy='50' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='0.9s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='26.5' cy='26.5' r='6'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='1.2s' begin='1.05s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E";

	let imgNode;
	let observer;
	let isIntersecting = false;
	let isLoaded = false;
	let hasError = false;

	function getPlaceholder() {
		if (!browser) return PLACEHOLDER_LIGHT;
		const isDark = document.documentElement.classList.contains('dark');
		return isDark ? PLACEHOLDER_DARK : PLACEHOLDER_LIGHT;
	}

	let displaySrc = lazy ? getPlaceholder() : src;

	// Reset state if src prop changes
	$: if (src) {
		if (lazy) {
			isIntersecting = false;
			isLoaded = false;
			hasError = false;
			displaySrc = getPlaceholder();
			setupObserver();
		} else {
			displaySrc = src;
		}
	}

	function updateTheme() {
		if (!isIntersecting) {
			displaySrc = getPlaceholder();
		}
	}

	function setupObserver() {
		if (!browser || !imgNode || !lazy) return;
		if (observer) observer.disconnect();

		observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				isIntersecting = true;
				displaySrc = src;
				observer.disconnect();
			}
		}, { rootMargin: '50px' });

		observer.observe(imgNode);
	}

	onMount(() => {
		if (lazy) {
			setupObserver();
			const observerConfig = { attributes: true, attributeFilter: ['class'] };
			const themeObserver = new MutationObserver(updateTheme);
			themeObserver.observe(document.documentElement, observerConfig);
			
			return () => {
				if (observer) observer.disconnect();
				themeObserver.disconnect();
			};
		}
	});

	function handleLoad() {
		if (displaySrc === src) isLoaded = true;
	}

	function handleError() {
		if (displaySrc === src) hasError = true;
	}
</script>

<style>
	img {
		display: block;
		width: 100%;
		height: auto;
		transition: opacity 0.3s ease-out;
	}
	.loading { opacity: 1; }
	.loaded { opacity: 1; }
	.error { opacity: 0.5; filter: grayscale(100%); }
</style>

<img
	bind:this={imgNode}
	src={displaySrc}
	{alt}
	class="{className} {isLoaded ? 'loaded' : hasError ? 'error' : 'loading'}"
	{height}
	{width}
	on:load={handleLoad}
	on:error={handleError}
	decoding="async"
/>