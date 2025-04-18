<h3>Window width conditional</h3>
<p>Transitions will occur when window width size is less than 768 pixels</p>
<p>Fly and blur will behave differently when when window size is less than 640 pixels</p>
<bold>Current window width is</bold>

<style>
	bold::after {
		content: var(--width);
	}

	:root:has(h3) {
		--width: ' >= 768px';
		@media (width < 768px) {
			--width: ' < 768px and >= 640px';
			--enabled: 'enabled';
		}
		@media (width < 640px) {
			--width: ' < 640px';
			--x: 0vw;
			--y: -100vh;
			--amount: 4rem;
		}
	}
</style>
