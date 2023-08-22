<script lang="ts">
	import type { crossfade } from "$lib/index.js";

	export let intro: ReturnType<typeof crossfade>[0]
	export let outro: ReturnType<typeof crossfade>[1]
	export let enabled: boolean;
</script>

<button on:click>
	<h1 in:intro|global={{enabled, key: 'crossfade' }} out:outro|global={{enabled, key: 'crossfade' }}>crossfade</h1>
	<span in:intro|global={{enabled, key: 'emoji' }} out:outro|global={{enabled, key: 'emoji' }}>😎</span>
</button>

<style>
	button {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.7);
		display: grid;
		place-content: center;
		border: none;
	}
</style>
