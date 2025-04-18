<script lang="ts">
	import { page } from '$app/state';
	import Links from './Links.svelte';

	const examples = ['toggle', 'breakpoint', 'merge'];
</script>

<nav>
	<Links />
	<ul>
		<li><h2>Svelte Enhanced Transitions</h2></li>
	</ul>
	<ul>
		{#each examples as example}
			<li>
				<a
					href="/example/{example}"
					role={page.url.pathname === `/example/${example}` ? 'button' : undefined}
				>
					{example}
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
