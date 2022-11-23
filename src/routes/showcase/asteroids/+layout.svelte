<script lang="ts">
	import SvelteHead from "$lib/components/SvelteHead.svelte";



</script>


<SvelteHead
	sharePath="/showcase/asteroids"
	title="Asteroids"
	description="Fly your ship and shoot down all the asteroids!"
	imagePath="/assets/asteroids-thumb.png"
	imageAlt="A retro-themed red spaceship flying above a white planet with red asteroids floating around and small stars on a black background."
	width="600"
	height="600"
/>
<slot />

<style>
  @font-face {
    font-family: 'PressStart';
    src: url('/assets/PressStart2P-Regular.ttf');
  }

  :global(.wrapper *) {
		font-family: 'PressStart', monospace;
	}
</style>