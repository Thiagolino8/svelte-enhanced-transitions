<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from '$lib/index.js';
	import { getCrossfade } from './+layout.svelte';

	const [intro, outro] = getCrossfade();

	const searchParams = new URLSearchParams($page.url.searchParams);
	searchParams.delete('modal');
	const closeLink = searchParams.toString()
		? `${$page.url.pathname}?${searchParams.toString()}`
		: $page.url.pathname;
</script>

<dialog transition:fade={{ enabled: '--enabled' }} open>
	<a
		href={closeLink}
		data-sveltekit-replacestate
		data-sveltekit-noscroll
		aria-label="Close"
		class="backdrop"
	/>
	<article>
		<header>
			<a
				data-sveltekit-replacestate
				data-sveltekit-noscroll
				role="button"
				href={closeLink}
				aria-label="Close"
				class="close"
			/>
			<h2
				in:intro={{ enabled: '--enabled', key: 'crossfade' }}
				out:outro={{ enabled: '--enabled', key: 'crossfade' }}
			>
				crossfade
			</h2>
			<p
				in:intro={{ enabled: '--enabled', key: 'emoji' }}
				out:outro={{ enabled: '--enabled', key: 'emoji' }}
			>
				😎
			</p>
		</header>
		<h3>This is a crossfade example</h3>
	</article>
</dialog>

<style>
	.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	article {
		z-index: 1;
	}
	article {
		overflow: visible;
	}

	p {
		display: inline-block;
	}

	h2 {
		display: inline-block;
	}
</style>
