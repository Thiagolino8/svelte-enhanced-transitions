<script lang="ts">
	import Modal from './Modal.svelte';
	import { blur, fade, fly, draw, scale, crossfade, slide } from '$lib/index.js';

	let show = false;
	let modal = false;
	let width: number = 0;

	$: enabled = width < 800;

	const [intro, outro] = crossfade({
		fallback: () => ({})
	});

	const toggleModal = () => {
		modal = !modal;
	};
</script>

<svelte:window bind:innerWidth={width} />

<h3>Enhanced Transitions</h3>
<p>Transitions will occur when window width size is less than 800 pixels</p>
<p>Fly and blur will behave differently when when window size is less than 600 pixels</p>
<p>Current window width: {width}</p>

{#if !modal}
	<button on:click={toggleModal}>
		<span
			in:intro|global={{ enabled, key: 'crossfade' }}
			out:outro|global={{ enabled, key: 'crossfade' }}>crossfade</span
		>
		<span in:intro|global={{ enabled, key: 'emoji' }} out:outro|global={{ enabled, key: 'emoji' }}
			>😎</span
		>
	</button>
{/if}

{#if modal}
	<Modal {enabled} {intro} {outro} on:click={toggleModal} />
{/if}

<button on:click={() => (show = !show)}>Show/Hide</button>

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
				in:draw={{ enabled }}
				out:draw={{ enabled }}
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</p>
	<p in:fly={{ enabled, x: '--x', y: '--y' }} out:fly={{ enabled, x: '--x', y: '--y' }}>fly</p>
	<p in:blur={{ enabled, amount: '--amount' }} out:blur={{ enabled, amount: '--amount' }}>blur</p>
	<p in:fade={{ enabled }} out:fade={{ enabled }}>fade</p>
	<p in:scale={{ enabled }} out:scale={{ enabled }}>scale</p>
	<p in:slide={{ enabled }} out:slide={{ enabled }}>slide</p>
{/if}

<style>
	p {
		--x: 100vw;
		--y: 0vh;
		--amount: 1rem;
		position: relative;
	}

	@media (max-width: 600px) {
		p {
			--x: 0vw;
			--y: -100vh;
			--amount: 4rem;
		}
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
