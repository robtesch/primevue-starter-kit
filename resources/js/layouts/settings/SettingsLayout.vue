<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { Link } from '@inertiajs/vue3';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import type { MenuItem } from 'primevue/menuitem';

const sidebarNavItems: MenuItem[] = [
    {
        label: 'Profile',
        key: 'profile',
        href: route('profile.edit'),
        is_current: route().current('profile.edit'),
    },
    {
        label: 'Password',
        key: 'password',
        href: route('password.edit'),
        is_current: route().current('password.edit'),
    },
    {
        label: 'Appearance',
        key: 'appearance',
        href: route('appearance'),
        is_current: route().current('appearance'),
    },
];
</script>

<template>
    <div class="px-4 py-6">
        <Heading title="Settings" description="Manage your profile and account settings" />

        <div class="flex flex-col lg:flex-row lg:space-x-12">
            <aside class="w-full max-w-xl lg:w-48">
                <nav class="flex flex-col space-y-1 space-x-0">
                    <Button v-for="item in sidebarNavItems" :key="item.key" :text="!item.is_current" fluid>
                        <Link :href="item.href" class="w-full text-left">
                            {{ item.label }}
                        </Link>
                    </Button>
                </nav>
            </aside>

            <Divider layout="vertical" />

            <div class="flex-1 md:max-w-2xl">
                <section class="max-w-xl space-y-12">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>
