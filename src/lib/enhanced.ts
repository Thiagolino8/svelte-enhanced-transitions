import {
	blur as svelte_blur,
	crossfade as svelte_crossfade,
	draw as svelte_draw,
	fade as svelte_fade,
	fly as svelte_fly,
	scale as svelte_scale,
	slide as svelte_slide,
	type TransitionConfig
} from 'svelte/transition';

type WithOptions<T> = T & { enabled?: boolean | string };

const getCssVars = (
	style: CSSStyleDeclaration,
	options: Record<string, unknown>,
	cssVarCompatibleKeys: string[]
) => {
	[...cssVarCompatibleKeys, 'enabled'].forEach((key) => {
		const cssVar = options[key];
		if (cssVar && typeof cssVar === 'string') {
			const cssVarValue = style.getPropertyValue(cssVar);
			if (cssVarValue) {
				options[key] = cssVarValue;
			}
		}
	});
};

export const enhanceTransition =
	<T extends Element, U>(
		transitionFn: (node: T, options: U) => TransitionConfig | (() => TransitionConfig),
		cssVarCompatibleKeys?: string[]
	) =>
	(node: T, options: WithOptions<U> = { enabled: true } as WithOptions<U>) => {
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
export const crossfade = (options: Parameters<typeof svelte_crossfade>[0]) => {
	const [send, receive] = svelte_crossfade(options);
	return [enhanceTransition(send), enhanceTransition(receive)];
};
