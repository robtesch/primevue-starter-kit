<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import Breadcrumb from 'primevue/breadcrumb';
import type { MenuItem } from 'primevue/menuitem';

const props = defineProps<{
    breadcrumbs: MenuItem[];
}>();

const home: MenuItem = {
    icon: 'fa-solid fa-house',
    command: () => {
        router.visit(route('dashboard'));
    },
};
</script>

<template>
    <Breadcrumb :home="home" :model="props.breadcrumbs" />
</template>
