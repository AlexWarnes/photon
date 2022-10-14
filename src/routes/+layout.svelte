<script>
import GitHub from "$lib/svg/GitHub.svelte";
import Twitter from "$lib/svg/Twitter.svelte";

</script>

<nav>
	<a href="/">HOME</a>
	<a href="/showcase">SHOWCASE</a>
	<span class="spacer"></span>
	<a href="https://github.com/AlexWarnes/photon/tree/main/src/routes/showcase" title="GitHub" aria-label="GitHub">
		<GitHub />
	</a>
	<a href="https://twitter.com/a_warnes" title="Twitter" aria-label="Twitter">
		<Twitter />
	</a>
</nav>

<main>
	<slot />
</main>

<style>
	@import '../global.css';

	nav {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fafbfc;
		z-index: 1;
	}
	nav > * {
		margin: 0 0.5rem;
	}

	a {
    color: #444444;
    text-decoration: none;
		padding: 1rem;
  }
  a:visited {
    color: #444444;
  }

	main {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-top: 67px;
		position: relative;
	}

	.spacer {
		flex-grow: 1;
	}

</style>
