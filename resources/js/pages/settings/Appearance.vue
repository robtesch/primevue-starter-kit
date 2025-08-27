<script setup lang="ts">
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/SettingsLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import type { MenuItem } from 'primevue/menuitem';

const breadcrumbItems: MenuItem[] = [
    {
        label: 'Appearance settings',
        command: () => {
            router.visit(route('appearance'));
        },
    },
];

defineOptions({ layout: [AppLayout, SettingsLayout] });
</script>

<template>
    <Head title="Appearance settings" />

    <Teleport defer to="#breadcrumbs">
        <Breadcrumbs :breadcrumbs="breadcrumbItems" class="bg-transparent" />
    </Teleport>

    <div class="space-y-6">
        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
        <AppearanceTabs />
    </div>
</template>
