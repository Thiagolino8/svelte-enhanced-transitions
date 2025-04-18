<h3>State conditional</h3>
<p>You can enable and disable the transitions toggling the state selecting the checkbox</p>
<p>Fly and blur have 2 diferent sets of behaviors, you can toggle them with the radio inputs</p>

<label>
	<input type="checkbox" name="enabled" />
	<span>Transitions are</span>
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
	:root {
		:global {
			&:has(input[type='radio'][value='1']:checked) {
				--content: ' 1';
			}

			&:has(input[type='radio'][value='2']:checked) {
				--content: ' 2';
				--x: 0vw;
				--y: -100vh;
				--amount: 4rem;
			}
			label:has(input[type='checkbox']) {
				span::after {
					content: ' disabled';
					@container style(--enabled: true) {
						content: ' enabled';
					}
				}
			}
			&:has(input[type='checkbox']:checked) {
				--enabled: true;
			}
		}
	}

	bold::after {
		content: var(--content);
	}
</style>
