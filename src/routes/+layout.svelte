<script lang="ts">
	import { page } from '$app/stores';
	import '@picocss/pico';
	import Modal from './Modal.svelte';
	import Nav from './Nav.svelte';
	import Transitions from './Transitions.svelte';
	import Footer from './Footer.svelte';
	import { slide } from 'svelte/transition';

	export let data;

	$: modal = $page.url.searchParams.has('modal');
</script>

<svelte:head>
	<title>Enhanced Transitions</title>
	<meta name="description" content="Enhanced Transitions" />
</svelte:head>

<main class="container">
	<Nav />
	<article>
		<bold>All transition state management in this demo works without javascript, with css variables</bold>
		{#key data.pathname}
			<div in:slide out:slide>
				<slot />
			</div>
		{/key}
	</article>
	<Transitions />
	<Footer />
</main>

{#if modal}
	<Modal />
{/if}

<style>
	main {
		overflow-x: hidden;
	}

	article {
		display: grid;
		grid: 1fr / 1fr;
	}

	div {
		grid-area: span 1 / span 1;
	}

	:root {
		overflow-y: scroll;
		height: 125vh;
		position: relative;
		--x: 100vw;
		--y: 0vh;
		--amount: 1rem;
	}

	:global(html) {
		overflow-y: scroll;
	}

	:global(p) {
		z-index: 1000;
	}

	:global(h1, h2, h3, p, bold) {
		margin: 0;
	}

	:global(button) {
		width: auto;
	}
</style>
