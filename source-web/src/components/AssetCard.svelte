<script>
	import externalIcon from '@/assets/icons/external.svg';
	import infoIcon from '@/assets/icons/info.svg';
	import tagIcon from '@/assets/icons/tag.svg';
	import Image from '@/components/ui/Image.svelte';

	export let assets;
	export let category;
</script>

{#each assets as asset}
	<article
		class="asset-card group transition-all rounded-lg ring-zinc-700 ring-2 hover:ring-[--card-color] dark:bg-zinc-800 bg-purple-50 dark:text-white overflow-hidden"
		style="--card-color: {category.color}"
	>
		<div class="relative">
			<a
				href={asset.link}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={'Open ' + asset.title}
			>
				<Image
					src={asset.img}
					alt={asset.title + ' web preview'}
					lazy={true}
					className="aspect-video object-cover lazyImg inline-block w-full"
					height="216"
					width="384"
				/>
			</a>
			{#if asset.tags}
				<ul
					class="flex gap-x-2.5 items-center absolute bottom-0 right-0 bg-purple-50 dark:bg-zinc-800 before:rotate-[265deg] before:absolute flex-wrap justify-end before:w-3 before:h-3 before:-left-3 before:bottom-0 before:z-10 before:rounded-full before:shadow-[-0.5rem_0.5rem_#faf5ff] dark:before:shadow-[-0.5rem_0.5rem_#27272a] before:rounded-br w-fit rounded-tl-md px-2 py-0.5 text-zinc-950 dark:text-white"
					title="Tags"
				>
					<li>
						<img src={tagIcon} alt="" width="16" height="16" class="w-4 invert dark:invert-0" />
					</li>
					{#each asset.tags as tag}
						<li
							class="text-[14px] tracking-wide before:h-2.5 before:w-[1px] before:bg-zinc-900 dark:before:bg-white before:bg-opacity-50 before:absolute before:-left-1.5 before:top-0 before:bottom-0 before:m-auto relative"
						>
							{tag}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="p-5 flex flex-wrap justify-between items-center relative">
			<div class="relative">
				<a href={asset.link} target="_blank" rel="noopener noreferrer">
					<h3 class="text-xl hover:underline text-zinc-950 dark:text-white">
						{asset.title}
					</h3>
					<img
						src={externalIcon}
						alt=""
						class="absolute w-5 invert dark:invert-0 -right-3 top-0 bottom-0 m-auto opacity-0 group-hover:opacity-100 transition-all group-hover:-right-6"
					/>
				</a>
			</div>

			{#if asset.license}
				<div class="group/license relative">
					<a
						class="bg-blue-700 transition-all hover:scale-105 inline-block px-2 py-1 rounded-md text-[13px] tracking-wide"
						target="_blank"
						rel="noopener noreferrer"
						href={asset.licenseLink || asset.link}
					>
						{#if asset.licenseDescription}
							<img
								src={infoIcon}
								alt=""
								width="16"
								height="16"
								class="w-4 inline-block mr-.5 mb-0.5"
							/>
						{/if}
						{asset.license}
					</a>

					{#if asset.licenseDescription}
						<p
							class="text-sm py-1 px-3 w-max max-w-xs rounded-md absolute -bottom-8 right-0 opacity-0 bg-zinc-800 transition-all group-hover/license:bottom-6 group-hover/license:opacity-100 group-hover/license:pointer-events-auto pointer-events-none"
						>
							{asset.licenseDescription}
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</article>
{/each}
