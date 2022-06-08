<script lang="ts">
	import Indicator from '$lib/components/Indicator.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import Chevron from '$lib/svg/Chevron.svelte';
	import Rotate from '$lib/svg/Rotate.svelte';
	import { getContext } from 'svelte';
	import { controlStatus, firstPerson } from './stores';
	export let rX: number;
	export let rY: number;
	export let rZ: number;
	const { xThrust, yThrust, zThrust } = getContext('THRUST');
	let rotationUnits = 'RADIANS';
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

	function displayRotation(value: number, units: string) {
		if (units === 'RADIANS') {
			return (value % (2 * Math.PI)).toFixed(2);
		}

		if (units === 'DEGREES') {
			return (((value * 180) / Math.PI) % 360).toFixed(2);
		}
	}
	$: updateZThrust(zPower);
</script>

<div class="panel-wrapper">
	<Panel>
		<div class="panel-content">
			<h3 class="panel-heading">SHIP CONTROLS</h3>
			<Indicator label={$controlStatus} color={$controlStatus === 'Locked' ? 'red' : 'limegreen'} style="justify-content: flex-start; font-size: 0.75rem;" />

			<div class="ship-controls">
				<button on:click={() => (xPower -= inc)} class="U" disabled={$controlStatus === 'Locked'}>
					<Chevron />
				</button>
				<button on:click={() => (zPower -= inc)} class="zR" disabled={$controlStatus === 'Locked'}>
					<Rotate direction="CW" />
				</button>
				<button on:click={() => (yPower -= inc)} class="yR" disabled={$controlStatus === 'Locked'}>
					<Chevron direction="RIGHT" />
				</button>
				<button on:click={() => (xPower += inc)} class="D" disabled={$controlStatus === 'Locked'}>
					<Chevron direction="DOWN" />
				</button>
				<button on:click={() => (zPower += inc)} class="zL" disabled={$controlStatus === 'Locked'}>
					<Rotate direction="CCW" /></button
				>
				<button on:click={() => (yPower += inc)} class="yL" disabled={$controlStatus === 'Locked'}>
					<Chevron direction="LEFT" />
				</button>
			</div>
			<div class="rotation-ind">
				<h3 class="panel-heading">
					ROTATION <span class="secondary-text">({rotationUnits.toLowerCase()})</span>
				</h3>
				<Indicator color="red">
					<div class="rotation-label" slot="label">
						<span>X Axis (Pitch)</span>
						<span>{displayRotation(rX, rotationUnits)}</span>
					</div>
				</Indicator>
				<Indicator color="limegreen">
					<div class="rotation-label" slot="label">
						<span>Y Axis (Yaw)</span>
						<span>{displayRotation(rY, rotationUnits)}</span>
					</div>
				</Indicator>
				<Indicator color="blue">
					<div class="rotation-label" slot="label">
						<span>Z Axis (Roll)</span>
						<span>{displayRotation(rZ, rotationUnits)}</span>
					</div>
				</Indicator>
			</div>
			<h3 class="panel-heading">SETTINGS</h3>
			<label
				>First Person View
				<input type="checkbox" bind:checked={$firstPerson} />
			</label>
			<h4 class="panel-heading">ROTATION UNITS</h4>
			<label
				>Radians
				<input type="radio" bind:group={rotationUnits} value="RADIANS" />
			</label>
			<label
				>Degrees
				<input type="radio" bind:group={rotationUnits} value="DEGREES" />
			</label>
		</div>
	</Panel>
</div>

<style>
	.panel-wrapper {
		position: fixed;
		top: 1rem;
		right: 1rem;
		font-size: 12px;
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
		/* background-color: salmon; */
		/* transform: rotate(45deg); */
		width: 7rem;
		height: 7rem;
		margin: 1.5rem auto 0;
	}
	.ship-controls button {
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-color: #00000088;
		border: 1px solid #fafbfc18;
		color: #fafbfc;
		cursor: pointer;
	}

	.ship-controls .U {
		left: 50%;
		transform: translateX(-50%);
		/* border-color: #ff000088; */
		box-shadow: 0 0 4px #ff000088;
	}
	.ship-controls .zR {
		left: 100%;
		top: 5%;
		box-shadow: 0 0 4px #0000ff88;
	}
	.ship-controls .yR {
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		box-shadow: 0 0 4px #32cd3288;
	}
	.ship-controls .D {
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		box-shadow: 0 0 4px #ff000088;
	}
	.ship-controls .zL {
		right: 100%;
		top: 5%;
		box-shadow: 0 0 4px #0000ff88;
	}
	.ship-controls .yL {
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		box-shadow: 0 0 4px #32cd3288;
	}

	.panel-heading {
		margin: 1.5rem 0 0.5rem;
	}
	.panel-heading .secondary-text {
		font-weight: 400;
		font-size: 0.75rem;
	}

	.rotation-label {
		width: 100%;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
	}
</style>
