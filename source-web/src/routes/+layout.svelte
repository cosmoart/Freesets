<script>
	import NavBar from '@/components/NavBar.svelte';
	import Menu from '../components/Menu.svelte';
	import { onNavigate } from '$app/navigation';
	import './styles.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from.params.category === navigation.to.params.category) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app flex-1 flex flex-col p-6 md:px-10 max-w-[95rem] mx-auto min-h-screen">
	<div
		class="bg-dots [view-transition-name:bgDots] invert dark:invert-0 fixed opacity-10 inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
	/>
	<NavBar />
	<slot />
	<Menu />
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
