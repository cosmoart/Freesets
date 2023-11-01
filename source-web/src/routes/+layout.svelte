<script>
	import BackTop from './BackTop.svelte';
	import NavBar from './NavBar.svelte';
	import Menu from './Menu.svelte';
	import './styles.css';
</script>

<div class="app flex-1 flex flex-col p-6 md:px-10 max-w-[95rem] mx-auto min-h-screen">
	<NavBar />
	<slot />
	<BackTop />
	<Menu />
</div>
