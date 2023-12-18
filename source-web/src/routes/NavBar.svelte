<script>
	import categories from '@/assets/categories.json';
	import { page } from '$app/stores';

	$: currentPage = $page.params.category;
</script>

<nav>
	<ul class="flex gap-2 flex-wrap text-md">
		<li>
			<a
				href="/"
				class={`flex items-center w-full justify-center gap-2 bg-zinc-800 dark:bg-white rounded-md px-4 py-1.5 flex-grow outline-2 outline-zinc-800 dark:outline-white text-white dark:text-zinc-950 outline-offset-2 cursor-pointer hover:scale-[1.03] transition-transform ${
					currentPage === undefined ? 'outline' : ''
				}`}
			>
				<img src="/categories-icons/home.svg" alt="" class="invert dark:invert-0 w-[23px]" />
			</a>
		</li>
		{#each categories as category}
			<li class="flex-grow  md:min-w-[10.5rem] 2xl:min-w-[12rem]">
				<a
					href={`/${category.nameID}`}
					class={`flex items-center w-full justify-center gap-2 bg-[--item-color] rounded-md px-4 py-1.5 flex-grow outline-2 outline-[--item-color] outline-offset-2 cursor-pointer  transition-transform ${
						category.nameID === currentPage ? 'outline' : 'hover:scale-[1.03]'
					}`}
					style={`--item-color: ${category.color}`}
				>
					<img
						src={'/categories-icons/' + category.nameID + '.svg'}
						alt=""
						class="invert w-[23px]"
					/>
					{category.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
