<script>
	import tagIcon from '@/assets/icons/tag.svg';
	let { tags } = $props();
	const maxChars = 30;

	let visibleTags = $state([]);
	let hiddenTags = $state([]);

	$effect(() => {
		const localVisible = [];
		const localHidden = [];
		let totalChars = 0;

		for (let tag of tags ?? []) {
			if (totalChars + tag.length <= maxChars) {
				localVisible.push(tag);
				totalChars += tag.length;
			} else {
				localHidden.push(tag);
			}
		}

		visibleTags = localVisible;
		hiddenTags = localHidden;
	});
</script>

{#if tags}
	<div
		class="flex cursor-default gap-1 items-center absolute bottom-0 right-0 bg-purple-50 dark:bg-zinc-800 before:rotate-[265deg] before:absolute flex-wrap justify-end before:w-3 before:h-3 before:-left-3 before:bottom-0 before:z-10 before:rounded-full before:shadow-[-0.5rem_0.5rem_#faf5ff] dark:before:shadow-[-0.5rem_0.5rem_#27272a] before:rounded-br w-fit rounded-tl-md px-2 py-0.5 text-zinc-950 dark:text-white"
		title="Tags"
	>
		<img src={tagIcon} alt="" width="16" height="16" class="w-4 invert dark:invert-0" />

		<ul class="flex flex-wrap items-center text-sm relative group/tags">
			{#each visibleTags as tag, i}
				<li
					class="text-[14px] tracking-wide relative px-1.5 leading-3 my-1 {i ===
					visibleTags.length - 1
						? ''
						: 'border-r border-zinc-600'}"
				>
					{tag}
				</li>
			{/each}

			{#if hiddenTags.length > 0}
				<div class="text-zinc-500 group-hover/tags:text-zinc-800 dark:group-hover/tags:text-white">
					+{hiddenTags.length}

					<div
						class="absolute flex flex-wrap max-w-sm items-center -top-full -right-2 z-10 opacity-0 group-hover/tags:opacity-100 transition-all translate-y-3 group-hover/tags:-translate-y-1 py-1.5 px-3 rounded-tl-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
					>
						{#each hiddenTags as tag, i}
							<li
								class="text-[14px] tracking-wide relative {i === hiddenTags.length - 1
									? ''
									: 'border-r border-zinc-600 '} px-1.5 leading-3"
							>
								{tag}
							</li>
						{/each}
					</div>
				</div>
			{/if}
		</ul>
	</div>
{/if}
