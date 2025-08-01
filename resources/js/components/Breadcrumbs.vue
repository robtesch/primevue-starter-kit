<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import type { MenuItem } from 'primevue/menuitem';

const props = defineProps<{
    breadcrumbs: MenuItem[];
}>();

const home = { icon: 'fa-solid fa-house', url: '/' };

const items = props.breadcrumbs.map((item) => ({
    label: item.title,
    url: item.href,
}));
</script>

<template>
    <Breadcrumb :home="home" :model="items" />
</template>
