<script>
	export let categoryQ;
	export let categories;

	// $: {
	// 	const params = new URLSearchParams(window.location.search);
	// 	params.set('category', categoryQ);
	// 	window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
	// }
</script>

<nav>
	<ul class="flex gap-2 flex-wrap">
		<li class="flex-grow">
			<label>
				<input
					type="radio"
					class="hidden peer"
					name="category"
					value="all"
					bind:group={categoryQ}
				/>
				<span
					class="flex items-center w-full justify-center gap-2 bg-blue-500 rounded-md px-4 py-1.5 flex-grow outline-2 outline-blue-500 outline-offset-2 peer-[:checked]:scale-[1.03] peer-[:checked]:outline cursor-pointer hover:scale-[1.03] transition-transform"
				>
					<img src="/categories-icons/all.svg" alt="" class="invert w-6" />
					All
				</span>
			</label>
		</li>
		{#each categories as category}
			<li class="flex-grow md:min-w-[12rem] text-base">
				<label>
					<input
						type="radio"
						class="hidden peer"
						name="category"
						value={category.name.toLowerCase()}
						bind:group={categoryQ}
					/>
					<span
						class="flex items-center w-full justify-center gap-2 bg-[--item-color] rounded-md px-4 py-1.5 flex-grow outline-2 outline-[--item-color] outline-offset-2 peer-[:checked]:scale-[1.03] peer-[:checked]:outline cursor-pointer hover:scale-[1.03] transition-transform"
						style={`--item-color: ${category.color}`}
					>
						<img
							src={'/categories-icons/' +
								category.name.toLowerCase().replaceAll(/\/|\s/g, '-') +
								'.svg'}
							alt=""
							class="invert w-6"
						/>
						{category.name}
					</span>
				</label>
			</li>
		{/each}
	</ul>
</nav>
