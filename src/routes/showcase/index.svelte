<script>
	import Paper from '$lib/components/Paper.svelte';

	const scenes = [
		{
			name: 'The Expanse',
			path: '/showcase/the-expanse',
			thumb: './assets/the-expanse-thumb.png',
      description: "",
      warning: "WARNING: This scene is resource intensive and loads large models. You probably should not view it on your phone."
		},
		{
			name: 'Black Hole',
			path: '/showcase/black-hole',
			thumb: './assets/black-hole-thumb.png',
      description: "",
		},
		{
			name: 'Lamina Noisy Spheres',
			path: '/showcase/lamina-noisy-spheres',
			thumb: './assets/noisy-spheres-thumb.png',
      description: "",
		},
		{
			name: 'InstancedMesh Spheres',
			path: '/showcase/instanced-spheres',
			thumb: './assets/instanced-spheres-thumb.png',
      description: "",
		},
	];
</script>

<div class="grid-wrapper">
  {#each scenes as scene (scene.path)}
	<Paper style="margin: 1rem;">
    <a class="card-link-wrapper" href={scene.path}>
			<div class="card">
        <div class="img-wrapper">
          <img width="300" height="300" src="{scene.thumb}" alt="Thumbnail for {scene.name} 3D scene" class="thumb">
        </div>
        <div class="card-content">
          <h2>{scene.name}</h2>
          <p class="description">{scene.description || ""}</p>
          <p class="warning">{scene.warning || ""}</p>
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
  }
	.card {
		max-width: 300px;
    overflow: hidden;
	}

  img {
    transition: all 500ms ease-in-out;
  }
  .card:hover {
    background-color: #fafbfc;
  }
  .card:hover img {
    transform: scale(1.25);
  }

  .card-content {
    padding: 0.75rem;
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
</style>
