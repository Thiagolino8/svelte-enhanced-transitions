<script lang="ts">
	import { fly, blur, fade, scale, slide } from 'svelte/transition';
	import { mergeTransitions } from '$lib/index.js';

	const options = { fly: fly, blur: blur, fade: fade, scale: scale, slide: slide } as const;

	let chosen = $state.raw<(typeof options)[keyof typeof options][]>([blur, slide]);
	let show = $state.raw(false);

	const resultant = $derived(mergeTransitions(...chosen));
</script>

<h3>Merge transitions</h3>
<p>Choose two or more transitions to be used</p>
<select bind:value={chosen} multiple>
	{#each Object.keys(options) as (keyof typeof options)[] as option}
		<option value={options[option]}>{option}</option>
	{/each}
</select>

<button
	onclick={() => {
		show = !show;
	}}>So cool</button
>

{#if show}
	<h4 transition:resultant>Merged transitions are so cool</h4>
{/if}

<style>
	:root:has(select) {
		:global([data-sveltekit-replacestate], bold) {
			display: none;
		}
	}
</style>
