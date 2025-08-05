import { h, type Component, type VNodeChild } from 'vue';

export function createLayout<P extends Record<string, unknown>>(
    LayoutComponent: Component<P>,
    layoutProps?: P,
): (renderFn: typeof h, page: VNodeChild) => VNodeChild {
    return (renderFn, page) => renderFn(LayoutComponent, layoutProps, () => page);
}
