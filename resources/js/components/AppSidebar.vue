<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from '@/composables/useSidebar';
import { AppPageProps } from '@/types';
import { router, usePage } from '@inertiajs/vue3';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';
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

const { openMobile, isMobile, toggleSidebar, state } = useSidebar(usePage<AppPageProps>().props.sidebarOpen);
</script>

<template>
    <div
        class="flex min-h-svh w-full bg-sidebar"
        :style="{
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        }"
    >
        <Drawer v-if="isMobile" :visible="openMobile" @update:visible="toggleSidebar">
            <div class="flex h-full w-full flex-col">
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
