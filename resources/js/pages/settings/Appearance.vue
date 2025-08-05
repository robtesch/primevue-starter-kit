<script setup lang="ts">
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Head } from '@inertiajs/vue3';
</script>

<script lang="ts">
import { composeLayouts } from '@/composables/composeLayouts';
import { createLayout } from '@/composables/createLayout';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/SettingsLayout.vue';
import { router } from '@inertiajs/vue3';
import type { MenuItem } from 'primevue/menuitem';

const breadcrumbItems: MenuItem[] = [
    {
        label: 'Appearance settings',
        command: () => {
            router.visit(route('appearance'));
        },
    },
];

export default {
    layout: composeLayouts(createLayout(AppLayout, { breadcrumbs: breadcrumbItems }), createLayout(SettingsLayout)),
};
</script>

<template>
    <Head title="Appearance settings" />

    <div class="space-y-6">
        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
        <AppearanceTabs />
    </div>
</template>
