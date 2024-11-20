<script>
	import searchIcon from '@/assets/icons/search.svg';
	import assets from '@/store.js';
	import { queryParameters } from 'sveltekit-search-params';
	const params = queryParameters({}, { debounceHistory: 400 });

	const handleSearch = (event) => {
		if (event.target.value) assets.search(event.target.value);
	};
</script>

<li>
	<search>
		<form
			class="relative rounded-t-md text-zinc-950"
			onsubmit={(e) => {
				e.preventDefault();
				assets.search(new FormData(e.target).get('q'));
			}}
		>
			<input
				type="search"
				name="q"
				bind:value={$params.q}
				oninput={handleSearch}
				placeholder="Search..."
				class="rounded-t px-3.5 py-2 max-w-48 focus:outline-none"
			/>
			<button
				type="submit"
				aria-label="Search"
				class="group transition-colors p-1.5 right-1 rounded-r-md absolute top-0 bottom-0"
			>
				<img
					src={searchIcon}
					alt=""
					class="w-5 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-transform"
				/>
			</button>
		</form>
	</search>
</li>

<style>
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
