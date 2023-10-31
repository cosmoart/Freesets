<script>
	let navOpen = false;
</script>

<div class="bg-blue-600 fixed bottom-5 right-5 z-50 rounded-md p-2">
	<nav class={navOpen ? 'block' : 'hidden'}>
		<ul>
			<li>
				<button class="rounded-t-md transition-colors hover:bg-zinc-700 px-2">Dark mode</button>
			</li>
			<li>
				<button class="transition-colors hover:bg-zinc-700 px-2">Contribute</button>
			</li>
			<li>
				<input
					class="rounded-md transition-colors text-zinc-900 px-2 w-full"
					type="number"
					name=""
					id=""
					min="1"
					max="8"
					value="3"
				/>
			</li>
		</ul>
	</nav>
	<input type="checkbox" bind:checked={navOpen} id="nav-toggle" class="cursor-pointer w-7 h-7" />
</div>
