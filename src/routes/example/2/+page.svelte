<div id="page-1" />
<h3>Window width conditional</h3>
<p>Transitions will occur when window width size is less than 768 pixels</p>
<p>Fly and blur will behave differently when when window size is less than 640 pixels</p>
<bold>Current window width is</bold>

<style>
	bold {
		--width: ' >= 768px';
	}

	@media (max-width: 768px) {
		bold {
			--width: ' < 768px and >= 640px';
		}
	}

	@media (max-width: 640px) {
		bold {
			--width: ' < 640px';
		}
	}

	bold::after {
		content: var(--width);
	}

	@media (max-width: 768px) {
		:root:has(#page-1) {
			--enabled: 'enabled';
		}
	}

	@media (max-width: 640px) {
		:root:has(#page-1) {
			--x: 0vw;
			--y: -100vh;
			--amount: 4rem;
		}
	}
</style>
