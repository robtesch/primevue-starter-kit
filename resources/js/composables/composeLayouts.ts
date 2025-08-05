import { h as vueH, type VNodeChild } from 'vue';

/**
 * Compose multiple Inertia layout‐functions so you can nest layouts:
 * composeLayouts(fnApp, fnSettings)(h, page) === fnApp(h, fnSettings(h, page))
 */
export function composeLayouts(...layoutFns: ((h: typeof vueH, page: VNodeChild) => VNodeChild)[]): (h: typeof vueH, page: VNodeChild) => VNodeChild {
    return (h, page) => layoutFns.reduceRight((child, fn) => fn(h, child), page);
}
