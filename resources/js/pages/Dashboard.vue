<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import type { MenuItem } from 'primevue/menuitem';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';

const breadcrumbs: MenuItem[] = [
    {
        label: 'Dashboard',
        command: () => {
            router.visit(route('dashboard'));
        },
    },
];

defineOptions({ layout: AppLayout });
</script>

<template>
    <Head title="Dashboard" />

    <Teleport defer to="#breadcrumbs">
        <Breadcrumbs :breadcrumbs="breadcrumbs" class="bg-transparent" />
    </Teleport>

    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <PlaceholderPattern />
            </div>
            <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <PlaceholderPattern />
            </div>
            <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <PlaceholderPattern />
            </div>
        </div>
        <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
            <PlaceholderPattern />
        </div>
    </div>
</template>
