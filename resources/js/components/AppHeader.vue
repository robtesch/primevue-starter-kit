<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getInitials } from '@/composables/useInitials';
import { AppPageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/vue3';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref } from 'vue';

const drawerVisible = ref(false);

const userMenu = ref();

const userMenuItems = ref([
    {
        label: 'Settings',
        icon: 'fa-solid fa-gear',
        route: route('profile.edit'),
    },
    {
        label: 'Log out',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        command: () => {
            router.post(route('logout'));
        },
    },
]);

interface Props {
    breadcrumbs?: MenuItem[];
}

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage<AppPageProps>();
const auth = computed(() => page.props.auth);

const isCurrentRoute = computed(() => (url: string) => page.url === url);

const activeItemStyles = computed(
    () => (url: string) => (isCurrentRoute.value(url) ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100' : ''),
);

const mainNavItems: MenuItem[] = [
    {
        label: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        icon: 'fa-solid fa-table-cells-large',
    },
];

const rightNavItems: MenuItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: 'fa-solid fa-folder',
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: 'fa-solid fa-book-open',
    },
];
</script>

<template>
    <div>
        <div class="border-b border-sidebar-border/80">
            <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                <!-- Mobile Menu -->
                <div class="lg:hidden">
                    <Button text rounded class="mr-2 h-9 w-9" @click="drawerVisible = true">
                        <i class="fa-solid fa-bars h-5 w-5" />
                    </Button>
                    <Drawer v-model:visible="drawerVisible" header="Navigation Menu" class="w-[300px] p-6">
                        <template #container>
                            <div class="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                                <div class="flex justify-start text-left">
                                    <AppLogoIcon class="size-6 fill-current text-black dark:text-white" />
                                </div>
                                <nav class="-mx-3 space-y-1">
                                    <Link
                                        v-for="item in mainNavItems"
                                        :key="item.key"
                                        :href="item.route"
                                        class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                                        :class="activeItemStyles(item.route)"
                                    >
                                        <i v-if="item.icon" :class="item.icon" class="h-5 w-5" />
                                        {{ item.label }}
                                    </Link>
                                </nav>
                                <div class="flex flex-col space-y-4">
                                    <a
                                        v-for="item in rightNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center space-x-2 text-sm font-medium"
                                    >
                                        <i v-if="item.icon" :class="item.icon" class="h-5 w-5" />
                                        <span>{{ item.title }}</span>
                                    </a>
                                </div>
                            </div>
                        </template>
                    </Drawer>
                </div>

                <Link :href="route('dashboard')" class="flex items-center gap-x-2">
                    <AppLogo />
                </Link>

                <!-- Desktop Menu -->
                <div class="hidden h-full lg:flex lg:flex-1">
                    <Menubar :model="mainNavItems" class="ml-10 flex h-full items-stretch">
                        <template #item="{ item, props }">
                            <Link v-ripple :href="item.route" v-bind="props.action" class="flex items-center">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </Link>
                        </template>
                    </Menubar>
                </div>

                <div class="ml-auto flex items-center space-x-2">
                    <div class="relative flex items-center space-x-1">
                        <Button text rounded class="group h-9 w-9 cursor-pointer">
                            <i class="fa-solid fa-magnifying-glass opacity-80 group-hover:opacity-100" />
                        </Button>

                        <div class="hidden space-x-1 lg:flex">
                            <template v-for="item in rightNavItems" :key="item.title">
                                <TooltipProvider :delay-duration="0">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button text rounded as-child class="group h-9 w-9 cursor-pointer">
                                                <a :href="item.href" target="_blank" rel="noopener noreferrer">
                                                    <span class="sr-only">{{ item.title }}</span>
                                                    <component :is="item.icon" class="size-5 opacity-80 group-hover:opacity-100" />
                                                </a>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{{ item.title }}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </template>
                        </div>
                    </div>

                    <Menu :model="userMenuItems" popup ref="userMenu">
                        <template #item="{ item, props }">
                            <a v-ripple :href="item.route" v-bind="props.action" class="flex items-center">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </template>
                    </Menu>
                    <Button
                        text
                        rounded
                        class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                        @click="userMenu.toggle($event)"
                    >
                        <Avatar
                            v-if="auth.user.avatar"
                            :image="auth.user.avatar"
                            :alt="auth.user.name"
                            shape="circle"
                            class="size-8 overflow-hidden rounded-full"
                        />
                        <Avatar
                            v-else
                            :label="getInitials(auth.user?.name)"
                            shape="circle"
                            class="size-8 overflow-hidden rounded-full bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                        />
                    </Button>
                </div>
            </div>
        </div>

        <div v-if="props.breadcrumbs.length > 1" class="flex w-full border-b border-sidebar-border/70">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>
