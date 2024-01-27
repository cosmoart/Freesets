<script>
	import Assest from '@/components/Assets.svelte';
	export let data;

	const image = `https://res.cloudinary.com/cosmocloudinary/image/upload/f_auto,q_auto/v1/freesets/og/${data.nameID}`;
	const description = `Explore a collection of the best free ${data.name} resources/assets for your next project.`;
	const title = data.name + ' - Freesets';
</script>

<svelte:head>
	<title>{data.name} - Freesets</title>
	<meta name="theme-color" content={data.color} />
	<meta name="view-transition" content="same-origin" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Cosmo" />
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23{data.color.slice(
			1
		)}' d='m12 14.475l1.925 1.15q.275.175.537-.012t.188-.513l-.5-2.175l1.7-1.475q.25-.225.15-.537t-.45-.338l-2.225-.175l-.875-2.075q-.125-.3-.45-.3t-.45.3l-.875 2.075l-2.225.175q-.35.025-.45.338t.15.537l1.7 1.475l-.5 2.175q-.075.325.188.513t.537.012L12 14.475ZM8.65 20H6q-.825 0-1.413-.588T4 18v-2.65L2.075 13.4q-.275-.3-.425-.662T1.5 12q0-.375.15-.738t.425-.662L4 8.65V6q0-.825.588-1.413T6 4h2.65l1.95-1.925q.3-.275.663-.425T12 1.5q.375 0 .738.15t.662.425L15.35 4H18q.825 0 1.413.588T20 6v2.65l1.925 1.95q.275.3.425.663t.15.737q0 .375-.15.738t-.425.662L20 15.35V18q0 .825-.588 1.413T18 20h-2.65l-1.95 1.925q-.3.275-.662.425T12 22.5q-.375 0-.737-.15t-.663-.425L8.65 20Z'/%3E%3C/svg%3E"
	/>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<meta property="og:url" content="https://freesets.vercel.app" />
	<meta property="og:description" content={description} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@CosmoArt0" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<Assest categories={[data]} />
