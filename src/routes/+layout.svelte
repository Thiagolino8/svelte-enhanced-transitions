<script lang="ts">
	import '@picocss/pico';
</script>

<main class="container">
	<slot />
</main>

<style>
	main {
		overflow-x: hidden;
	}

	:global(html) {
		overflow-y: scroll;
	}
</style>