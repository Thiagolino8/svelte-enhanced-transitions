<h3>Window width conditional</h3>
<p>Transitions will occur when window width size is less than 800 pixels</p>
<p>Fly and blur will behave differently when when window size is less than 600 pixels</p>
<bold>Current window width is</bold>

<style>
	bold {
		--width: ' >= 800px';
	}

	@media (max-width: 800px) {
		bold {
			--width: ' < 800px and >= 600px';
		}
	}

	@media (max-width: 600px) {
		bold {
			--width: ' < 600px';
		}
	}

	bold::after {
		content: var(--width);
	}

	@media (max-width: 800px) {
		:root {
			--enabled: 'enabled';
		}
	}

	@media (max-width: 600px) {
		:root {
			--x: 0vw;
			--y: -100vh;
			--amount: 4rem;
		}
	}
</style>
