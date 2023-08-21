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

type WithOptions<T> = T & { enabled?: boolean };

export const conditionalTransition =
	<T extends HTMLElement | SVGElement, U>(
		transitionFn: (node: T, options: U) => TransitionConfig | (() => TransitionConfig)
	) =>
	(node: T, options: WithOptions<U>) => {
		const { enabled = true } = options;
		const transition = enabled ? transitionFn(node, options) : null;

		if (typeof transition === 'function') {
			return () => (enabled ? transition() : { duration: 0 }) satisfies TransitionConfig;
		}

		return (enabled && transition ? transition : { duration: 0 }) satisfies TransitionConfig;
	};

export const blur = conditionalTransition(svelte_blur);
export const fade = conditionalTransition(svelte_fade);
export const fly = conditionalTransition(svelte_fly);
export const slide = conditionalTransition(svelte_slide);
export const scale = conditionalTransition(svelte_scale);
export const draw = conditionalTransition(svelte_draw);
export const crossfade = (options: Parameters<typeof svelte_crossfade>[0]) => {
	const [send, receive] = svelte_crossfade(options);
	return [conditionalTransition(send), conditionalTransition(receive)];
};
