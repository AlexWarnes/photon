<script lang="ts">
	import {
		staticFormulaText,
		getFormula,
		type TrigFn,
		type ZFactor,
		type ZDimension
	} from './dataUtils.js';
	import { slide } from 'svelte/transition';
	
	export let fn: TrigFn;
	export let zFactor: ZFactor;
	export let zDimension: ZDimension;

</script>

<pre transition:slide>
// For each Instance, we calculate the x,y,z coordinates


/* 
*  x and y are plotted at a random angle
*  and random instance radius within the maximum radius
*/
{staticFormulaText}

/*
*  z (default: 0) can be calculated differently by
*  using the inputs above.
*  The pseudocode will update accordinly.
*/ 
{getFormula(fn, zFactor, zDimension)}

return new Vector3(x, y, z)
</pre>

<style>
	pre {
		background: #191925e6;
		padding: 0.75rem;
	}
</style>