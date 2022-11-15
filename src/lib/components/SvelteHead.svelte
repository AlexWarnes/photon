<script>
  export let baseURL = "https://photon-alexwarnes.vercel.app"
  export let sharePath = "/"
  export let title = "Photon"
  export let description = "An opensource portfolio of 3D scenes, experiments, and prototypes."
  export let imagePath = "/assets/photon_og.png"
  export let imageAlt = "Screenshot of a 3D portfolio with several geometries of different color floating around."
  export let width = "1200";
  export let height = "630";
  export let twitterCardType = "summary_large_image"
</script>

<svelte:head>
  <meta property="og:image:width" content={width} />
		<meta property="og:image:height" content={height} />
		<meta property="og:title" content="{title}" />
		<meta
			property="og:description"
			content="{description}"
		/>
		<meta property="og:url" content="{baseURL + sharePath}" />
		<meta property="og:image" content="{baseURL + imagePath}" />

		<meta name="twitter:card" content="{twitterCardType}" />
		<meta name="twitter:site" content="@a_warnes" />
		<meta name="twitter:creator" content="@a_warnes" />
		<meta name="twitter:title" content="{title}" />
		<meta
			name="twitter:description"
			content="{description}"
		/>
		<meta name="twitter:image" content="{baseURL}{imagePath}" />
		<meta name="twitter:image:alt" content="{imageAlt}" />


</svelte:head>