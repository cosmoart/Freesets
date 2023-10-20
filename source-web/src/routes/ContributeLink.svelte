<script>
	import starIcon from '@/assets/icons/star.svg';
	import externalLinkIcon from '@/assets/icons/external-link.svg';
</script>

<a
	href="https://github.com/cosmoart/free-resources"
	target="_blank"
	rel="noopener noreferrer"
	class="fixed group bottom-5 right-5 p-1 w-8 h-8 ring-2 ring-zinc-800 hover:scale-105 transition-transform bg-white rounded-md z-50"
>
	<span
		class="absolute text-base right-0 transition-all opacity-0 group-hover:right-8 group-hover:opacity-100 rounded-l-md py-1 px-2 bg-zinc-800 w-max top-0 bottom-0 m-auto tracking-wide"
		>Contribute</span
	>
	<div class="overflow-hidden relative w-8 h-8">
		<img
			src={externalLinkIcon}
			alt=""
			class="w-6 absolute -right-6 group-hover:right-2 transition-all"
		/>
		<img src={starIcon} alt="" class="w-6 absolute right-2 group-hover:right-8 transition-all" />
	</div>
</a>
