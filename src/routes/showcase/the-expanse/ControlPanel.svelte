<script lang="ts">
	import Indicator from '$lib/components/Indicator.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import { getContext } from 'svelte';
	import { controlStatus, firstPerson } from './stores';
  export let rZ: number;
	const { xThrust, yThrust, zThrust } = getContext('THRUST');

	const inc: number = 0.1;

	// X AXIS
	let xPower = 0;
	const updateXThrust = (power: number) => ($xThrust = power);
	$: updateXThrust(xPower);

	// Y AXIS
	let yPower = 0;
	const updateYThrust = (power: number) => ($yThrust = power);
	$: updateYThrust(yPower);

	// Z AXIS
	let zPower = 0;
	const updateZThrust = (power: number) => ($zThrust = power);
	$: updateZThrust(zPower);
</script>

<div class="panel-wrapper">
	<Panel>
		<div class="panel-content">
			<Indicator
				label="Controls: {$controlStatus.toUpperCase()}"
				color={$controlStatus === 'Locked' ? 'red' : 'limegreen'}
			/>

			<div class="ship-controls">
				<button on:click={() => (xPower -= inc)} class="U">U</button>
				<button on:click={() => (zPower -= inc)} class="zR">zR</button>
				<button on:click={() => (yPower -= inc)} class="yR">yR</button>
				<button on:click={() => (xPower += inc)} class="D">D</button>
				<button on:click={() => (zPower += inc)} class="zL">zL</button>
				<button on:click={() => (yPower += inc)} class="yL">yL</button>
			</div>
		</div>
    <Indicator label="Z: {(rZ % 2 * Math.PI).toFixed(2)}" />
    <input type="checkbox" bind:checked={$firstPerson}>
	</Panel>
</div>

<style>
	.panel-wrapper {
		position: fixed;
		top: 1rem;
		right: 1rem;
		font-size: 14px;
	}

	.panel-content {
		width: 12rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.ship-controls {
		position: relative;
		background-color: salmon;
		transform: rotate(45deg);
		width: 5rem;
		height: 5rem;
		margin: 2rem auto;
	}
	.ship-controls button {
		position: absolute;
	}

	.ship-controls .U {
		left: 0;
	}
	.ship-controls .zR {
		right: 50%;
	}
	.ship-controls .yR {
		right: 0;
	}
	.ship-controls .D {
		right: 0;
		bottom: 0;
	}
	.ship-controls .zL {
		left: 0;
		top: 50%;
	}
	.ship-controls .yL {
		left: 0;
		bottom: 0;
	}
</style>
