<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import darkModeIcon from '@/assets/icons/darkmode.svg';
	import lightModeIcon from '@/assets/icons/lightmode.svg';
	import starIcon from '@/assets/icons/star.svg';
	import menuIcon from '@/assets/icons/menu.svg';
	import closeIcon from '@/assets/icons/close.svg';
	import searchIcon from '@/assets/icons/search.svg';

	$: q = new URLSearchParams($page.url.searchParams).get('q');
	let navOpen = false;
	let darkMode = true;

	onMount(() => (darkMode = localStorage.getItem('darkMode') === 'true'));

	function changueTheme() {
		document.documentElement.classList.toggle('dark');
		localStorage.setItem('darkMode', !darkMode);
		darkMode = !darkMode;
	}
</script>

<div class="[view-transition-name:menu] fixed bottom-5 right-5 z-50">
	<nav
		class="bg-blue-600 rounded-md rounded-br-none transition-all p-2 {navOpen
			? 'opacity-100 translate-y-0'
			: 'opacity-0 translate-y-4 pointer-events-none'}"
	>
		<ul>
			{#if $page.url.pathname !== '/'}
				<li>
					<search>
						<form
							class="relative rounded-t-md text-zinc-950"
							on:submit={(e) => goto(`/?q=${new FormData(e.target).get('q')}`)}
						>
							<input
								type="search"
								name="q"
								value={q}
								placeholder="Search..."
								class="rounded-t px-3 w-44 py-1"
							/>
							<button
								type="submit"
								aria-label="Search"
								class="group transition-colors p-1.5 right-0 rounded-r-md absolute"
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
			{/if}
			<li>
				<button
					class="group transition-colors hover:bg-zinc-800 px-3 w-full {$page.url.pathname !== '/'
						? ''
						: 'rounded-t'} py-1.5 flex items-center"
					on:click={changueTheme}
				>
					<img
						src={lightModeIcon}
						alt=""
						class="w-5 group-hover:scale-110 transition-all absolute invert {darkMode
							? ''
							: 'opacity-0 scale-0 rotate-90'}"
					/>
					<img
						src={darkModeIcon}
						alt=""
						class="w-5 group-hover:scale-110 transition-all absolute invert {darkMode
							? 'opacity-0 scale-0 -rotate-90'
							: ''}"
					/>
					<span class="w-20 ml-7 inline-block">{darkMode ? 'Light mode' : 'Dark mode'}</span>
				</button>
			</li>
			<li>
				<a
					href="https://github.com/cosmoart/Freesets"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors group w-full hover:bg-zinc-800 px-3 py-1.5 flex items-center gap-2.5 rounded-b-md"
				>
					<img src={starIcon} alt="" class="w-5 group-hover:scale-110 transition-transform" />
					Contribute
				</a>
			</li>
		</ul>
	</nav>

	<div
		class="before:rotate-[180deg] before:absolute before:w-3 before:h-3 before:-left-3 before:transition-all before:opacity-0 before:top-2 before:z-10 before:rounded-full before:shadow-[-0.5rem_0.5rem_#faf5ff] dark:before:shadow-[-0.5rem_0.5rem_#2563eb] before:rounded-br flexjustify-end w-9 h-9 relative bg-blue-600 transition-all rounded-md {navOpen
			? 'rounded-t-none before:!top-0 before:opacity-100'
			: ''} ml-auto group"
	>
		<input type="checkbox" bind:checked={navOpen} id="nav-toggle" class="cursor-pointer hidden" />
		<label for="nav-toggle" class="cursor-pointer">
			<img
				src={closeIcon}
				alt=""
				class={`w-7 invert top-1 left-1 transition-all absolute group-hover:scale-105 group-active:scale-90 ${
					navOpen ? '' : 'scale-20 opacity-0'
				}`}
			/>
			<img
				src={menuIcon}
				alt=""
				class={`w-7 invert top-1 left-1 transition-all absolute group-hover:scale-105 group-active:scale-90 ${
					navOpen ? 'scale-0 opacity-0' : ''
				}`}
			/>
		</label>
	</div>
</div>

<style>
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
