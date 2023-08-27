<h3>State conditional</h3>
<p>You can enable and disable the transitions toggling the state selecting the checkbox</p>
<p>Fly and blur have 2 diferent sets of behaviors, you can toggle them with the radio inputs</p>

<label>
	<input type="checkbox" name="enabled" />
	<span class="transitions-are">Transitions are</span>
</label>

<bold>Current css variables set:</bold>
<fieldset>
	<label>
		<span>Set 1</span>
		<input type="radio" name="css-var-set" value="1" checked />
	</label>
	<label>
		<span>Set 2</span>
		<input type="radio" name="css-var-set" value="2" />
	</label>
</fieldset>

<style>
	fieldset {
		display: flex;
		align-items: center;
	}

	:root:has(input[type='radio'][name='css-var-set']:checked[value='2']) {
		--content: ' 2';
	}

	:root {
		--content: ' 1';
	}

	bold::after {
		content: var(--content);
	}

	:root:has(input[type='checkbox'][name='enabled']:checked) {
		--enabled: 'enabled';
	}

	:root:has(input[type='checkbox'][name='enabled']:checked) label .transitions-are::after {
		content: ' enabled';
	}

	.transitions-are::after {
		content: ' disabled';
	}

	:root:has(input[type='radio'][name='css-var-set']:checked[value='2']) {
		--x: 0vw;
		--y: -100vh;
		--amount: 4rem;
	}
</style>
