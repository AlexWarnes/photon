<script lang="ts">
	export let direction: 'CW' | 'CCW' = "CCW";
	let degrees: number = 0;
	$: {
		switch (direction) {
			case 'CW':
				degrees = 180;
				break;
			case 'CCW':
				degrees = 0;
				break;
			default:
				degrees = 0;
		}
	}
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none" style="transform: rotateY({degrees}deg)"
	><path
    fill="currentColor"
		d="M26.2 44Q23.05 44 20 43.075Q16.95 42.15 14.6 40.15L16.7 37.95Q18.8 39.6 21.15 40.3Q23.5 41 26.2 41Q32.3 41 36.65 36.65Q41 32.3 41 26.2Q41 20.1 36.65 15.75Q32.3 11.4 26.2 11.4H24.1L28.3 15.6L26.1 17.8L18.2 9.9L26.1 2L28.3 4.2L24.1 8.4H26.2Q33.5 8.4 38.75 13.65Q44 18.9 44 26.2Q44 29.85 42.575 33.075Q41.15 36.3 38.725 38.725Q36.3 41.15 33.075 42.575Q29.85 44 26.2 44ZM13.1 37 2 25.9 13.1 14.8 24.2 25.9ZM13.1 32.9 19.9 26.1 13.1 19.3 6.3 26.1ZM13.1 26.1Z"
	/></svg
>
