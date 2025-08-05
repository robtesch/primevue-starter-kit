<script lang="ts">
export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
</script>

<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { router } from '@inertiajs/vue3';
import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { computed, HTMLAttributes, Ref, ref } from 'vue';
import AppLogo from './AppLogo.vue';

const mainNavItems = computed((): MenuItem[] => [
    {
        label: 'Platform',
        items: [
            {
                label: 'Dashboard',
                icon: 'fa-solid fa-table-cells-large',
                command: () => {
                    router.visit(route('dashboard'));
                },
            },
        ],
    },
]);

const footerNavItems = computed((): MenuItem[] => [
    {
        label: 'Github Repo',
        url: 'https://github.com/robtesch/primevue-starter-kit',
        icon: 'fa-solid fa-folder',
    },
    {
        label: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits#vue',
        icon: 'fa-solid fa-book-open',
    },
]);

const props = withDefaults(
    defineProps<{
        defaultOpen?: boolean;
        open?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        defaultOpen: true,
        open: undefined,
        class: undefined,
    },
);

const emits = defineEmits<{
    'update:open': [open: boolean];
}>();

const isMobile = useMediaQuery('(max-width: 768px)');
const openMobile = ref<boolean>(false);

const open = useVModel(props, 'open', emits, {
    defaultValue: props.defaultOpen ?? false,
    passive: (props.open === undefined) as false,
}) as Ref<boolean>;

function setOpen(value: boolean) {
    open.value = value;
    emits('update:open', value);

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}

function setOpenMobile(value: boolean) {
    openMobile.value = value;
}

// Helper to toggle the sidebar.
function toggleSidebar() {
    return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
}

useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
    }
});

// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = computed(() => (open.value ? 'expanded' : 'collapsed'));
</script>

<template>
    <div
        class="flex min-h-svh w-full bg-sidebar"
        :style="{
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        }"
    >
        <Drawer v-if="isMobile" :visible="openMobile">
            <Menu :model="mainNavItems" />
        </Drawer>

        <aside class="hidden text-sidebar-foreground md:block">
            <!-- This is what handles the sidebar gap on desktop  -->
            <div
                class="relative bg-transparent transition-[width] duration-200 ease-linear"
                :class="state === 'collapsed' ? 'w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]' : 'w-[calc(var(--sidebar-width)))]'"
            />

            <div
                class="fixed inset-y-0 left-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex"
                :class="state === 'collapsed' ? 'w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]' : 'w-(--sidebar-width)'"
            >
                <div class="flex h-full w-full flex-col bg-sidebar">
                    <div class="flex flex-col gap-2 p-2">
                        <div class="flex items-center justify-between gap-2" :class="{ 'flex-col-reverse': state === 'collapsed' }">
                            <!-- @vue-ignore href is allowed for i-link -->
                            <Button as="i-link" :href="route('dashboard')" class="items-center gap-2" text>
                                <AppLogo v-if="state === 'expanded'" />
                                <div
                                    v-else
                                    class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"
                                >
                                    <AppLogoIcon class="size-5 fill-current text-white dark:text-black" />
                                </div>
                            </Button>
                            <Button icon="fa-solid fa-bars" text @click="toggleSidebar" />
                        </div>
                    </div>

                    <div class="flex min-h-0 flex-1 flex-col gap-2 p-2">
                        <NavMain :items="mainNavItems" :state="state" />
                    </div>

                    <div class="flex flex-col gap-2 p-2">
                        <NavFooter :items="footerNavItems" :state="state" />
                        <NavUser :state="state" />
                    </div>
                </div>
            </div>
        </aside>
        <slot />
    </div>
</template>
