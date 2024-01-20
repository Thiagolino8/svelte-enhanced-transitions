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

export const enhanceTransition =
	<T extends Element, U, V extends TransitionConfig | (() => TransitionConfig)>
		(
		transitionFn: (node: T, options: U) => V,
		cssVarCompatibleKeys?: (keyof NonNullable<U>)[]
	) =>
	(node: T, options = { enabled: true } as U & { enabled?: boolean | string }) => {
		const style = getComputedStyle(node);
		options = Object.fromEntries(
			Object.entries(options).map(([key, option]) => {
				if (
					((cssVarCompatibleKeys && cssVarCompatibleKeys.some((v) => v === key)) ||
						key === 'enabled') &&
					typeof option === 'string' &&
					option.match(/--[\w-]+/g)
				) {
					const cssVarValue = style.getPropertyValue(option);
					return [key, cssVarValue];
				}
				return [key, option];
			})
		) as typeof options;
		const { enabled = true } = options;
		const transition = enabled ? transitionFn(node, options) : null;

		if (!enabled || !transition) return { duration: 0 };
		if (transition instanceof Function) {
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
