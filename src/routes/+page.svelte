<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<header>
	<div class="text-box">
		<p class="name">Alex Warnes</p>
		<h1>PHOTON</h1>
		<p class="subtitle">An opensource portfolio of 3D scenes, experiments, and prototypes.</p>
	</div>
</header>

<style>
	@font-face {
		font-family: ChakraPetch;
		src: url('/assets/ChakraPetch-Medium.ttf');
	}
	* {
		pointer-events: none;
	}
	header {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: transparent;
		color: #fafbfc;
		pointer-events: none;
		position: relative;
		padding: 0 0 40vh;
	}

	.text-box {
		padding: 1rem;
		background-color: #00000088;
	}

	h1 {
		text-decoration: overline;
		font-size: 3rem;
		margin-top: 0.75rem;
		font-family: ChakraPetch;

	}

	.name {
		font-family: ChakraPetch;
		margin: 0;
	}

	.subtitle {
		letter-spacing: 0.04rem;
	}
</style>
