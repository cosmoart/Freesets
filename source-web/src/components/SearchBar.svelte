<script>
	import searchIcon from '@/assets/icons/search.svg';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { variant = 'default', class: className = '' } = $props();

	const searchQuery = $derived($page.url.searchParams.get('q') || '');
	let inputElement;

	const handleInput = (event) => {
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const query = formData.get('q');
		
		if (query?.trim()) {
			goto(`/search?q=${encodeURIComponent(query.trim())}`, { 
				keepFocus: true 
			});
		}
	};

	$effect(() => {
		if (inputElement) {
			inputElement.value = searchQuery;
		}
	});

	const variants = {
		default: {
			container: 'relative rounded-t-md text-zinc-950',
			input: 'rounded-t px-3.5 py-2 max-w-48 focus:outline-none',
			button: 'group transition-colors p-1.5 right-1 rounded-r-md absolute top-0 bottom-0'
		},
		header: {
			container: 'relative w-full mt-4',
			input: 'rounded-md px-6 py-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm dark:text-white',
			button: 'group transition-colors p-4 right-2 rounded-r-md absolute top-0 bottom-0'
		},
		home: {
			container: 'relative w-full max-w-md mx-auto',
			input: 'rounded-md px-6 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white/90 dark:bg-zinc-800 backdrop-blur-sm dark:text-white',
			button: 'group transition-colors p-3 right-1 rounded-full absolute top-0 bottom-0'
		}
	};

	const currentVariant = $derived(variants[variant] || variants.default);
</script>

<search class={className}>
	<form class={currentVariant.container} onsubmit={handleSubmit}>
		<input
			bind:this={inputElement}
			type="search"
			name="q"
			placeholder="Search resources..."
			oninput={handleInput}
			class={currentVariant.input}
		/>
		<button
			type="submit"
			aria-label="Search"
			class={currentVariant.button}
		>
			<img
				src={searchIcon}
				alt=""
				class="w-5 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-transform dark:invert"
			/>
		</button>
	</form>
</search>

<style>
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
