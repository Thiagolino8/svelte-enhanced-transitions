<script lang="ts">
	import { page } from '$app/state';
	import { fade } from '$lib/index.js';
	import { on } from 'svelte/events';
	import { intro, outro } from './crossfade.js';

	const searchParams = new URLSearchParams(page.url.searchParams);
	searchParams.delete('modal');
	const closeLink = searchParams.toString()
		? `${page.url.pathname}?${searchParams.toString()}`
		: page.url.pathname;

	let link: HTMLAnchorElement;

	const open = (dialog: HTMLDialogElement) => {
		dialog.showModal();
		$effect(() =>
			on(dialog, 'click', (event) => {
				if (event.target === dialog) {
					link.click();
				}
			})
		);
	};
</script>

<dialog use:open transition:fade={{ enabled: '--enabled' }}>
	<article>
		<header>
			<a
				bind:this={link}
				data-sveltekit-replacestate
				data-sveltekit-noscroll
				role="button"
				href={closeLink}
				aria-label="Close"
				class="close"
			></a>
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
	article {
		z-index: 1;
		overflow: visible;
	}

	p,
	h2 {
		display: inline-block;
	}
</style>
