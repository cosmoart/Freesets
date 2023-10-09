<script>
	export let setCategory;
	export let categoryQ;
	export let categories;
</script>

<nav>
	<ul class="flex gap-3 mt-5 flex-wrap">
		<li class="flex-grow">
			<button
				class={`flex items-center font-semibold bg-blue-500 w-full justify-center gap-2 rounded-md px-4 py-2 flex-grow cursor-pointer hover:scale-105 transition-transform ${
					categoryQ === 'all' ? 'bg-opacity-100' : 'bg-opacity-50'
				}`}
				on:click={() => setCategory('all')}
			>
				<img src="/categories-icons/all.svg" alt="" class="invert w-8" />
				All
			</button>
		</li>
		{#each categories as category}
			<li class="flex-grow md:min-w-[15rem]">
				<button
					class={`flex items-center w-full justify-center gap-2 ${
						category.color
					} rounded-md px-4 py-2 flex-grow cursor-pointer hover:scale-105 transition-transform ${
						category.name.toLowerCase() === categoryQ
							? `outline-2 outline-offset-2 outline-blue-500 outline`
							: ''
					}`}
					on:click={() => setCategory(category.name)}
				>
					<img
						src={'/categories-icons/' + category.name.toLowerCase() + '.svg'}
						alt=""
						class="invert w-8"
					/>
					{category.name}
				</button>
			</li>
		{/each}
	</ul>
</nav>
