<script lang="ts">
	import { useKeyboardControls } from 'svelte-kbc';

	const { UP, RIGHT, DOWN, LEFT } = useKeyboardControls();
</script>

<div class="buttons">
	<div class="row">
		<button
			on:touchstart={() => ($UP = true)}
			on:touchend={() => ($UP = true)}
			class="btn up"
			class:active={$UP}
		/>
	</div>
	<div class="row">
		<button
			on:touchstart={() => ($LEFT = true)}
			on:touchend={() => ($LEFT = false)}
			class="btn left"
			class:active={$LEFT}
		/>
		<button
			on:touchstart={() => ($DOWN = true)}
			on:touchend={() => ($DOWN = false)}
			class="btn down"
			class:active={$DOWN}
		/>
		<button
			on:touchstart={() => ($RIGHT = true)}
			on:touchend={() => ($RIGHT = false)}
			class="btn right"
			class:active={$RIGHT}
		/>
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem 0 0;
	}

	.btn {
		width: 4rem;
		height: 4rem;
		border: 2px solid #696969;
		background-color: #00000020;
		margin: 0.125rem;
	}

	.btn.active {
		border: 2px solid lime;
	}
</style>
