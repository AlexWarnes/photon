<script lang="ts">
	export let direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' = "UP";
	let degrees: number = 0;
	$: {
		switch (direction) {
			case 'UP':
				degrees = 0;
				break;
			case 'RIGHT':
				degrees = 90;
				break;
			case 'DOWN':
				degrees = 180;
				break;
			case 'LEFT':
				degrees = -90;
				break;
			default:
				degrees = 0;
		}
	}
</script>

<svg style="transform: rotate({degrees}deg)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
		fill="currentColor"
	/>
</svg>

<style>
	svg {
		transform-origin: center;
	}
</style>