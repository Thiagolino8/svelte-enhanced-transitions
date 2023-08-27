<script lang="ts">
	import { page } from '$app/stores';

	const examples = ['/example/1', '/example/2'];
</script>

<nav>
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
