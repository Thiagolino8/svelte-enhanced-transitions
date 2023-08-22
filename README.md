# svelte-enhanced-transitions

Enhance your [svelte](https://github.com/sveltejs/svelte) transitions.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/svelte-enhanced-transitions)

![npm](https://img.shields.io/npm/v/svelte-enhanced-transitions)

![npm](https://img.shields.io/npm/dt/svelte-enhanced-transitions)

![GitHub last commit](https://img.shields.io/github/last-commit/thiagolino8/svelte-enhanced-transitions)

## Contributing

Contributions are always welcome!

## Authors

- [@thiagolino8](https://www.github.com/thiagolino8)

## Installation

Install svelte-enhanced-transitions with npm

```bash
  npm install svelte-enhanced-transitions@latest -D
```

## Features

The svelte-enhanced-transitions package allows you to enable and disable svelte transitions and use css variables in parameters that accept css units

## Usage/Examples

The package exports a high order function named `enhanceTransition` that adds to a transition the ability to receive an enabled parameter and the ability to use css variables in the parameters you indicate, the function receives the transition to be enhanced and the parameters that can receive css variables
In addition, the package also exports the seven standard svelte transitions already enhanced

### Buit-in transitions

```svelte
<script>
	import { fade } from 'svelte-enhanced-transitions';

	let show = false;
	let enabled = true;
</script>

<button on:click={() => show = !show}>toggle show</button>
<button on:click={() => show = !show}>toggle enabled</button>

{#if show}
  <p transition:fly={{ enabled, x: '--x', y: '--y' }}>fly</p>
{/if}

<style>
	p {
		--x: 100vw;
		--y: 1000vh;
	}

	@media (prefers-reduced-motion: reduce) {
		p {
			--x: 0vw;
			--y: 0vh;
		}
	}
</style>
```

### Custom transitions

```svelte
<script>
 import { enhanceTransition } from 'svelte-enhanced-transitions';

 function customBlur(node, params) {
	// your transition code
 }

 const enhancedCustomBlur = enhanceTransition(custom, ['amount']);

 let show = false;
 let enabled = true;
</script>

<button on:click={() => show = !show}>toggle show</button>
<button on:click={() => show = !show}>toggle enabled</button>

{#if show}
 <p transition:enhancedCustomBlur={{ enabled, amount: '--amount' }}>slide</p>
{/if}

<style>
 p {
	--amount: 10px;
 }

 @media (prefers-reduced-motion: reduce) {
	p {
		--amount: 0px;
	}
 }
</style>
```
