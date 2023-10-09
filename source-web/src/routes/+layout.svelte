<script>
	import './styles.css';
</script>

<div class="app">
	<slot />
</div>

<style>
	.app {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		width: 100%;
		max-width: 78rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
