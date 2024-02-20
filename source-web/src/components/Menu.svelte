<script>
	import darkModeIcon from '@/assets/icons/darkmode.svg';
	import lightModeIcon from '@/assets/icons/lightmode.svg';
	import starIcon from '@/assets/icons/star.svg';
	import menuIcon from '@/assets/icons/menu.svg';
	import closeIcon from '@/assets/icons/close.svg';
	import { onMount } from 'svelte';

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
		class={`bg-blue-600 rounded-md transition-all p-2 ${
			navOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
		}`}
	>
		<ul>
			<li>
				<button
					class="rounded-t-md transition-colors hover:bg-zinc-800 px-3 w-full py-1 flex gap-2 items-center"
					on:click={changueTheme}
				>
					<img src={darkMode ? lightModeIcon : darkModeIcon} alt="" class="w-5 invert" />
					<span class="w-20 inline-block">{darkMode ? 'Light mode' : 'Dark mode'}</span>
				</button>
			</li>
			<li>
				<a
					href="https://github.com/cosmoart/Freesets"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors w-full hover:bg-zinc-800 px-3 py-1 flex items-center gap-2 rounded-b-md"
				>
					<img src={starIcon} alt="" class="w-5" />
					Contribute
				</a>
			</li>
		</ul>
	</nav>

	<div class="flex justify-end w-9 h-9 relative bg-blue-600 rounded-md ml-auto group">
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
