<script>
	import Paper from '$lib/components/Paper.svelte';
	import SvelteHead from '$lib/components/SvelteHead.svelte';

	const scenes = [
		{
			name: 'Bad Sphere',
			path: '/showcase/bad-sphere',
			thumb: './assets/bad-sphere-thumb.png',
			description:
				'While attempting to create a sphere from points on a 2D circle, a series of mistakes created some beautiful geometry.',
			tools: ['threlte', 'InstancedMesh']
		},
		{
			name: 'Roll the Ball',
			path: '/showcase/roll-the-ball',
			thumb: './assets/roll-the-ball-thumb.png',
			description:
				'Roll the ball with arrows/wasd and jump with spacebar! Try to get the ball in the basket at the end of the track.',
			tools: ['threlte', 'rapier']
		},
		{
			name: 'Attractors',
			path: '/showcase/attractors',
			thumb: './assets/attractors-thumb.png',
			description:
				'Initial experiments with an attractor that simulates a source of gravity. Any rigid-body within range will be "pulled" toward the attractor.',
			tools: ['threlte', 'rapier']
		},
		{
			name: 'Cannon Fire',
			path: '/showcase/cannon-fire',
			thumb: './assets/cannon-fire-thumb.png',
			description:
				'Simple game with adjustable gravity, cannon power, debug visualizer. Simulates cannon fire with RigidBody linearVelocity derived from raycaster direction and a power coefficient.',
			tools: ['threlte', 'rapier', 'lamina']
		},
		{
			name: 'Threlte Physics',
			path: '/showcase/physics-threlte',
			thumb: './assets/physics-threlte-thumb.png',
			description:
				"Experimenting with threlte's new (as of v4) physics package @threlte/rapier and interactivity.",
			tools: ['threlte', 'rapier', 'lamina']
		},
		{
			name: 'Hydrogen Isotopes',
			path: '/showcase/hydrogen',
			thumb: './assets/hydrogen-thumb.png',
			description:
				'A scene full of clickable, floating hydrogen isotopes and interactive text with integrated html.',
			tools: ['threlte', 'lamina']
		},
		{
			name: 'Tree Fractals',
			path: '/showcase/h-tree',
			thumb: './assets/random-tree-thumb.png',
			description: 'A 3d h-tree generator with optional random-tree generation.',
			tools: ['threlte', 'lamina']
		},
		{
			name: 'Menger Sponge',
			path: '/showcase/menger-sponge',
			thumb: './assets/menger-sponge-thumb.png',
			description: 'A recursive "Menger Sponge" fractal with up to three iterations.',
			tools: ['threlte']
		},
		{
			name: 'The Expanse',
			path: '/showcase/the-expanse',
			thumb: './assets/the-expanse-thumb.png',
			description:
				'Control the Rocinante spacecraft in front of an intersellar ring gate from The Expanse.',
			tools: ['svelte-cubed', 'lamina', 'glTF'],
			warning: 'WARNING: Resource Intensive. Large Models. Not Mobile Friendly.'
		},
		{
			name: 'Black Hole',
			path: '/showcase/black-hole',
			thumb: './assets/black-hole-thumb.png',
			tools: ['svelte-cubed'],
			description:
				'Attempting to create a black hole effect with MeshPhysicalMaterial and PointLights.'
		},
		{
			name: 'Lamina Noisy Spheres',
			path: '/showcase/lamina-noisy-spheres',
			thumb: './assets/noisy-spheres-thumb.png',
			tools: ['svelte-cubed', 'lamina'],
			description: 'Observe the effect of scale on different types of noise with Lamina shaders.'
		},
		{
			name: 'InstancedMesh Spheres',
			path: '/showcase/instanced-spheres',
			thumb: './assets/instanced-spheres-thumb.png',
			tools: ['svelte-cubed', 'glTF'],
			description:
				'Add up to 10k instanced spheres and view the Nefertiti glTF model with a PointsMaterial.'
		}
	];
</script>

<SvelteHead />

<div class="grid-wrapper">
	{#each scenes as scene (scene.path)}
		<Paper style="margin: 1rem;" level="l1">
			<a class="card-link-wrapper" href={scene.path}>
				<div class="card">
					<div class="img-wrapper">
						<img
							width="300"
							height="300"
							src={scene.thumb}
							alt="Thumbnail for {scene.name} 3D scene"
							class="thumb"
						/>
					</div>
					<div class="card-content">
						<h2 class="scene-name">{scene.name}</h2>
						<div class="chip-list">
							{#each scene.tools as tool}
								<span class="chip">{tool}</span>
							{/each}
						</div>
						<p class="description">{scene.description || ''}</p>
						<p class="warning">{scene.warning || ''}</p>
					</div>
				</div>
			</a>
		</Paper>
	{/each}
</div>

<style>
	.grid-wrapper {
		overflow: auto;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.card {
		max-width: 300px;
		height: 520px;
		overflow: hidden;
		background-color: #fafbfc;
		transition: all 200ms ease-in-out;
	}

	img {
		transition: all 500ms ease-in-out;
	}
	.card:hover {
		background-color: #ffffff;
	}
	.card:hover img {
		transform: scale(1.25);
	}

	.card-content {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.scene-name {
		margin: 0.25rem 0 0.75rem;
		font-weight: 400;
	}

	.warning {
		color: red;
		font-size: 0.75rem;
	}

	a {
		color: #444444;
		text-decoration: none;
	}

	.img-wrapper {
		height: 300px;
		overflow: hidden;
	}

	.chip {
		font-size: 0.75rem;
		margin: 0 0.25rem 0 0;
		padding: 0.25rem 0.75rem;
		background-color: #444444;
		color: #fafbfc;
		border-radius: 1rem;
	}
</style>
