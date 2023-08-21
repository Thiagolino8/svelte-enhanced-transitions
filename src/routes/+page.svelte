<script lang="ts">
	import Modal from './Modal.svelte';
	import { blur, fade, fly, draw, scale, crossfade, slide } from './custom';

	let show = false;
	let modal = false;
	let width: number = 0;

	$: enabled = width < 400;

	const [intro, outro] = crossfade({
		fallback(node, params) {
			return fade(node, params);
		}
	});

	const toggleModal = () => {
		modal = !modal;
	};
</script>

<svelte:window bind:innerWidth={width} />

<h1>Enhanced Transitions</h1>
<h2>Transitions will occur when window size is less than 400 pixels</h2>
<h3>Current window width: {width}</h3>

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
	<p transition:blur={{ enabled }}>blur</p>
	<p transition:fade={{ enabled }}>fade</p>
	<p transition:fly={{ enabled, x: '5rem' }}>fly</p>
	<p transition:scale={{ enabled }}>scale</p>
	<p transition:slide={{ enabled }}>slide</p>
{/if}
