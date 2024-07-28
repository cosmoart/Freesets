<script>
	import categories from '@/assets/categories.js';
</script>

<ul
	class="w-full py-2 max-w-[55rem] flex motion-reduce:justify-between overflow-hidden justify-center items-center"
	style="--count: {categories.length}"
>
	{#each categories as category, i}
		<li style="--index: {i}">
			<a
				href={`/${category.nameID}`}
				class="p-2 hover:scale-110 align-middle transition-all group inline-block rounded-md hover:bg-[var(--item-color)]"
				style={`--item-color: ${category.color}`}
				title={category.name}
			>
				<img
					src={`/categories-icons/${category.nameID}.svg`}
					alt={category.name}
					class="size-[30px] object-contain dark:invert group-hover:invert"
				/>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		--speed: 20;
		--inset: 3;
		--outset: 3;
	}

	ul:hover li {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: no-preference) {
		li {
			--origin-x: calc(((var(--count) - var(--index)) + var(--inset, 0)) * 100%);
			--origin-y: 0;
			--destination-x: calc(calc((var(--index) + 1 + var(--outset, 0)) * -100%));
			--destination-y: 0;
			--duration: calc(var(--speed) * 1s);
			--delay: calc((var(--duration) / var(--count)) * (var(--index, 0) - (var(--count) * 0.9)));

			animation: slide var(--duration) calc(var(--delay) - (var(--count) * 0.5s)) infinite reverse
				linear;
			translate: var(--origin-x) var(--origin-y);
			min-width: 2.5rem;
		}

		@keyframes slide {
			100% {
				translate: var(--destination-x) var(--destination-y);
			}
		}
	}
</style>
