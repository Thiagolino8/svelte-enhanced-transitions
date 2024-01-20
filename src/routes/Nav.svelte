<script lang="ts">
	import { page } from '$app/stores';
	import Links from './Links.svelte';

	const examples = ['/example/1', '/example/2'];
</script>

<nav>
	<Links />
	<ul>
		<li><h2>Svelte Enhanced Transitions</h2></li>
	</ul>
	<ul>
		{#each examples as example}
			<li>
				<a href={example} role={$page.url.pathname === example ? 'button' : undefined}>
					{example.replaceAll('/', ' ').trim()}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	@media (width < 640px) {
		nav :global(ul:first-child) {
			display: none;
		}
	}
</style>
