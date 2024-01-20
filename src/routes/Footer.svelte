<script lang="ts">
	import Links from './Links.svelte';
</script>

<nav><Links /></nav>

<style>
	nav {
		position: fixed;
		bottom: 0;

		@media (width > 640px) {
			& {
				display: none;
			}
		}
	}
</style>
