import {
	blur as svelte_blur,
	crossfade as svelte_crossfade,
	draw as svelte_draw,
	fade as svelte_fade,
	fly as svelte_fly,
	scale as svelte_scale,
	slide as svelte_slide
} from 'svelte/transition';

/**
 * @typedef {import('svelte/transition').TransitionConfig} TransitionConfig
 */

/**
 * @template T
 * @typedef {T & { enabled?: boolean }} WithOptions
 */

/**
 * Get computed CSS variables and update options accordingly.
 * @param {CSSStyleDeclaration} style - The computed style of an element.
 * @param {Record<string, unknown>} options - Options to be updated.
 * @param {string[]} cssVarCompatibleKeys - Keys that are compatible with CSS variables.
 */
const getCssVars = (style, options, cssVarCompatibleKeys) => {
	cssVarCompatibleKeys.forEach((key) => {
		const cssVar = options[key];
		if (cssVar && typeof cssVar === 'string') {
			const cssVarValue = style.getPropertyValue(cssVar);
			if (cssVarValue) {
				options[key] = cssVarValue;
			}
		}
	});
};

/**
 * Enhance a Svelte transition function.
 * @template {Element} T
 * @template U
 * @param {(node: T, options: U) => TransitionConfig | (() => TransitionConfig)} transitionFn - The original transition function.
 * @param {string[]} [cssVarCompatibleKeys] - CSS variable compatible keys.
 * @returns {(node: T, options: WithOptions<U>) => TransitionConfig | (() => TransitionConfig)} The enhanced transition function.
 */
export const enhanceTransition = (transitionFn, cssVarCompatibleKeys) => (node, options) => {
	const { enabled = true } = options;
	if (cssVarCompatibleKeys) getCssVars(getComputedStyle(node), options, cssVarCompatibleKeys);
	const transition = enabled ? transitionFn(node, options) : null;

	if (!enabled || !transition) return { duration: 0 };
	if (typeof transition === 'function') {
		return transition;
	}
	return transition;
};

export const blur = enhanceTransition(svelte_blur, ['amount']);
export const fade = enhanceTransition(svelte_fade);
export const fly = enhanceTransition(svelte_fly, ['x', 'y']);
export const slide = enhanceTransition(svelte_slide);
export const scale = enhanceTransition(svelte_scale);
export const draw = enhanceTransition(svelte_draw);
/**
 * @param {Parameters<typeof svelte_crossfade>[0]} options
 */
export const crossfade = (options) => {
	const [send, receive] = svelte_crossfade(options);
	return [enhanceTransition(send), enhanceTransition(receive)];
};
