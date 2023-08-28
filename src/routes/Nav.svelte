<script lang="ts">
	import { page } from '$app/stores';

	const examples = ['/example/1', '/example/2'];
</script>

<nav>
	<ul>
		<li>
			<a href="https://www.npmjs.com/package/svelte-enhanced-transitions">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
					<path d="M208 208h-32V80h-48v128H48V48h160z" />
				</svg>
			</a>
		</li>
		<li>
			<a href="https://github.com/Thiagolino8/svelte-enhanced-transitions">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
					<path
						d="M49 0a49 49 0 0 0-15 96c2 0 3-1 3-2V84c-14 3-17-5-17-5-2-6-5-8-5-8-5-3 0-3 0-3 5 1 8 5 8 5 4 8 11 6 14 4 0-3 2-5 3-6-11-1-22-5-22-24 0-6 2-10 5-14-1-1-2-6 0-13 0 0 4-1 14 5a47 47 0 0 1 12-1l12 1c9-6 13-5 13-5 3 7 1 12 1 13 3 4 5 8 5 14 0 19-11 23-22 24 1 1 3 4 3 9v14c0 1 1 2 3 2 20-7 34-25 34-47C98 22 76 0 49 0z"
					/>
				</svg>
			</a>
		</li>
		<li>
			<a href="https://twitter.com/Thiagolinog">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M24 4.56c-.88.39-1.83.65-2.83.77a4.93 4.93 0 0 0 2.17-2.72c-.95.56-2 .97-3.13 1.2a4.92 4.92 0 0 0-8.4 4.48A13.9 13.9 0 0 1 1.68 3.15 4.93 4.93 0 0 0 3.2 9.72a4.9 4.9 0 0 1-2.23-.61A4.93 4.93 0 0 0 4.91 14a5 5 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.14 0 14.3-7.72 14-14.64.95-.7 1.79-1.57 2.45-2.55z"
					/>
				</svg>
			</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/thiago-lino-gomes-5812581bb">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M5 3.5C5 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1 5 2.1 5 3.5zM5 8H0v16h5V8zm8 0H8v16h5v-8.4c0-4.7 6-5 6 0V24h5V13.9c0-8-9-7.6-11-3.7V8z"
					/>
				</svg>
			</a>
		</li>
	</ul>
	<ul>
		<li><h2>Svelte Enhanced Transitions</h2></li>
	</ul>
	<ul>
		{#each examples as example}
			<li>
				<a href={example} role={$page.url.pathname === example ? 'button' : undefined}>
					{example.replaceAll('/', ' ')}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
