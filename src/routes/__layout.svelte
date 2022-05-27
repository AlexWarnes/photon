<script></script>

<nav>
	<a href="/">Home</a>
	<a href="/showcase">Showcase</a>
	<a href="#">GH</a>
	<a href="#">Twitter</a>
</nav>

<main>
	<slot />
</main>

<style>
	@import '../global.css';

	nav {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		padding: 0.25rem 1rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fafbfc;
		z-index: 1;
	}

	main {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-top: 2rem;
	}
</style>
