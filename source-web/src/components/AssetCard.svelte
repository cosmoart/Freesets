<script>
	import externalIcon from '@/assets/icons/external.svg';
	import infoIcon from '@/assets/icons/info.svg';
	import Image from '@/components/ui/Image.svelte';
	import Tags from './ui/Tags.svelte';

	let { assets } = $props();
</script>

{#each assets.assets as asset}
	<article
		class="asset-card group transition-all rounded-lg ring-zinc-600 ring-2 hover:ring-[--card-color] dark:text-white overflow-hidden"
		style="--card-color: {assets.color}"
	>
		<div class="relative">
			<a
				href={asset.link}
				target="_blank"
				rel="noopener noreferrer nofollow"
				aria-label={'Open ' + asset.name}
			>
				<Image
					src={asset.img}
					alt={asset.name + ' web preview'}
					className="aspect-video object-cover duration-300 group-hover:scale-[1.03] -z-10 transition-transform lazyImg inline-block w-full"
					height="216"
					width="384"
				/>
				<Image
					className="absolute bottom-0 aspect-square box-content object-cover w-11 rounded-tr-md"
					src="https://www.google.com/s2/favicons?domain={asset.link}&sz=128"
				/>
			</a>
			<Tags tags={asset.tags} />
		</div>

		<div
			class="p-5 dark:bg-zinc-800 bg-purple-50 flex flex-wrap justify-between items-center relative"
		>
			<div class="relative">
				<a href={asset.link} target="_blank" rel="noopener noreferrer nofollow">
					<h3 class="text-xl hover:underline text-zinc-950 dark:text-white">
						{asset.name}
					</h3>
					<img
						src={externalIcon}
						alt=""
						class="absolute w-[22px] invert dark:invert-0 -right-3 top-0 bottom-0 m-auto opacity-0 group-hover:opacity-100 transition-all group-hover:-right-7"
					/>
				</a>
			</div>

			{#if asset.license}
				<div class="group/license relative">
					{#if asset.licenseLink}
						<a
							class="bg-blue-700 transition-all hover:scale-105 inline-block px-2 py-1 rounded-md text-[13px] tracking-wide"
							target="_blank"
							rel="noopener noreferrer nofollow"
							href={asset.licenseLink}
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
					{:else}
						<div
							class="bg-blue-700 transition-all inline-block px-2 py-1 rounded-md text-[13px] tracking-wide"
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
						</div>
					{/if}

					{#if asset.licenseDescription}
						<p
							class="text-sm py-1 px-3 w-max max-w-xs rounded-md absolute -bottom-2 right-0 opacity-0 bg-zinc-800 transition-all group-hover/license:bottom-6 group-hover/license:opacity-100 group-hover/license:pointer-events-auto pointer-events-none"
						>
							{asset.licenseDescription}
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</article>
{/each}
