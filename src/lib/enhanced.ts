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

type TransitionFn<T> = (node: Element, params?: T) => TransitionConfig;

export const mergeTransitions =
	<T extends unknown[]>(
		...transitions: { [K in keyof T]: TransitionFn<T[K]> }
	): TransitionFn<UnionToIntersection<T[number]>> =>
	(node, params) => {
		const runningTransitions = transitions.map((t) => t(node, params));

		return {
			delay: Math.max(...runningTransitions.map((t) => t.delay || 0)),
			duration: Math.max(...runningTransitions.map((t) => t.duration || 0)),
			easing: runningTransitions[runningTransitions.length - 1].easing,
			css: (t, u) =>
				runningTransitions
					.map((transition) => (transition.css ? transition.css(t, u) : ''))
					.join(' '),
			tick: (t, u) => {
				for (const transition of runningTransitions) {
					if (transition.tick) {
						transition.tick(t, u);
					}
				}
			}
		};
	};

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

const a = mergeTransitions(svelte_blur);
const CSS_VAR_REGEX = /--[\w-]+/g;

export const enhanceTransition =
	<T extends Element, U, V extends TransitionConfig | (() => TransitionConfig)>(
		transitionFn: (node: T, options: U) => V,
		cssVarCompatibleKeys?: (keyof NonNullable<U>)[]
	) =>
	(node: T, options = { enabled: true } as U & { enabled?: boolean | string }) => {
		const style = getComputedStyle(node);
		const newOptions = Object.fromEntries(
			Object.entries(options).map(([key, option]) => {
				if (
					(cssVarCompatibleKeys?.some((v) => v === key) || key === 'enabled') &&
					typeof option === 'string' &&
					option.match(CSS_VAR_REGEX)
				) {
					const cssVarValue = style.getPropertyValue(option);
					return [key, cssVarValue];
				}
				return [key, option];
			})
		) as typeof options;
		const { enabled = true } = newOptions;
		const transition = enabled ? transitionFn(node, newOptions) : null;

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
