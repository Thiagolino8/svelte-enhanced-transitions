<script lang="ts">
	import { blur, draw, fade, fly, scale, slide } from '$lib/index.js';
	import { page } from '$app/stores';
	import { getCrossfade } from './+layout.svelte';

	const [intro, outro] = getCrossfade();

	$: modal = $page.url.searchParams.has('modal');
	$: show = $page.url.searchParams.has('show');
</script>

<a
	data-sveltekit-replacestate
	data-sveltekit-noscroll
	href={show ? $page.url.pathname : '?show=true'}
	role="button"
>
	{show ? 'Hide' : 'Show'}
</a>
{#if !modal}
	<a
		href={$page.url.search ? `${$page.url.href}&modal=true` : '?modal=true'}
		role="button"
		data-sveltekit-replacestate
		data-sveltekit-noscroll
		transition:fade={{ enabled: '--enabled' }}
	>
		<span
			in:intro={{ enabled: '--enabled', key: 'crossfade' }}
			out:outro={{ enabled: '--enabled', key: 'crossfade' }}
		>
			crossfade
		</span>
		<span
			in:intro={{ enabled: '--enabled', key: 'emoji' }}
			out:outro={{ enabled: '--enabled', key: 'emoji' }}
		>
			😎
		</span>
	</a>
{/if}

{#if show}
	<p>
		draw <svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				in:draw={{ enabled: '--enabled' }}
				out:draw={{ enabled: '--enabled' }}
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</p>
	<p
		in:fly={{ enabled: '--enabled', x: '--x', y: '--y' }}
		out:fly={{ enabled: '--enabled', x: '--x', y: '--y' }}
	>
		fly
	</p>
	<p
		in:blur={{ enabled: '--enabled', amount: '--amount' }}
		out:blur={{ enabled: '--enabled', amount: '--amount' }}
	>
		blur
	</p>
	<p in:fade={{ enabled: '--enabled' }} out:fade={{ enabled: '--enabled' }}>fade</p>
	<p in:scale={{ enabled: '--enabled' }} out:scale={{ enabled: '--enabled' }}>scale</p>
	<p in:slide={{ enabled: '--enabled' }} out:slide={{ enabled: '--enabled' }}>slide</p>
{/if}

<style>
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
