<script setup lang="ts">
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { MenuItem } from 'primevue/menuitem';

interface Props {
    breadcrumbs?: MenuItem[];
}

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppSidebarLayout :breadcrumbs="props.breadcrumbs">
        <slot />
    </AppSidebarLayout>
</template>
