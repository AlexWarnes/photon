<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import Vec3Input from '$lib/components/inputs/Vec3Input.svelte';
	import ColorInput from '$lib/components/inputs/ColorInput.svelte';
	import Indicator from '$lib/components/Indicator.svelte';
	import ControlGroup from '$lib/components/ControlGroup.svelte';
	import NumberInput from '$lib/components/inputs/NumberInput.svelte';
	import Select from '$lib/components/inputs/Select.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
  import RangeSlider from '$lib/components/inputs/RangeSlider.svelte';
	import { Color, Vector3 } from 'three';
	let v3 = new Vector3(1, 2, 3);
	let v3Open = false;
	let hex = '#fafbfc';
	let three = new Color(0xeeeeee);
	let colorOpen = false;
	let int = 45;
	let float = 0.25;
	let rad = Math.PI;
	let rangeOpen = false;
	let num = 14;
	let numOpen = false;
	let selected = 'GlitchPass';
	let selectedOpen = false;
	let stringOptions = ['GlitchPass', 'DotScreenPass', 'FilmPass', 'UnrealBloomPass'];
	let configOptions = [
		{ value: 'GlitchPass', displayValue: 'Glitch Pass' },
		{ value: 'DotScreenPass', displayValue: 'Dot Screen Pass' },
		{ value: 'FilmPass', displayValue: 'Film Pass' },
		{ value: 'UnrealBloomPass', displayValue: 'Unreal Bloom Pass' }
	];
	let menuOpen = false;
</script>

<div class="view">
	<div class="controls">
		<Panel>
			<Accordion title="Vec3Input" open={v3Open} on:click={() => (v3Open = !v3Open)}>
				<Vec3Input bind:value={v3} groupLabel="Test V3" />
				<pre>{JSON.stringify(v3)}</pre>
			</Accordion>
		</Panel>
		<Panel>
			<Accordion title="ColorInput" open={colorOpen} on:click={() => (colorOpen = !colorOpen)}>
				<ControlGroup>
					<Indicator
						label="THREE: {typeof three === 'string' ? three : 'red'}"
						color={typeof three === 'string' ? three : 'red'}
					/>
					<Indicator label="HEX: {hex}" color={hex} />
					<ColorInput bind:value={hex} label="Hex Color" />
					<ColorInput bind:value={three} label="THREE Color" />
				</ControlGroup>
			</Accordion>
		</Panel>
		<Panel>
			<Accordion title="RangeSlider" open={rangeOpen} on:click={() => (rangeOpen = !rangeOpen)}>
				<ControlGroup>
					<RangeSlider bind:value={float} label="Float {float}" min={0.15} max={1.5} type="FLOAT" />
					<RangeSlider bind:value={int} label="Int {int}" max={100} />
					<RangeSlider bind:value={rad} label="Rad {rad.toFixed(2)}" type="RADIAN" />
				</ControlGroup>
			</Accordion>
		</Panel>
		<Panel>
			<Accordion title="NumberInput" open={numOpen} on:click={() => (numOpen = !numOpen)}>
				<ControlGroup>
					<NumberInput bind:value={num} label="Number {num}" />
				</ControlGroup>
			</Accordion>
		</Panel>
		<Panel>
			<Accordion title="Select" open={selectedOpen} on:click={() => (selectedOpen = !selectedOpen)}>
				<ControlGroup>
					<Select bind:value={selected} label="Select {selected}" options={stringOptions} />
					<Select bind:value={selected} label="Select {selected}" options={configOptions} />
				</ControlGroup>
			</Accordion>
		</Panel>
		<Panel>
			<button
				style="position: relative; margin: 0 auto; background: darkcyan; color: white; pointer-events: all;"
				on:click={() => (menuOpen = !menuOpen)}
			>
				MENU
				<Menu bind:open={menuOpen} position="LEFT">
					<MenuItem on:click={() => console.log('First')}>First</MenuItem>
					<MenuItem on:click={() => console.log('Second')}>Second</MenuItem>
				</Menu>
			</button>
		</Panel>
	</div>
</div>

<style>
	.view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

  .controls {
    max-width: 320px;
    width: 100%;
  }
</style>
