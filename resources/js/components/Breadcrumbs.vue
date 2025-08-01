<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';

interface BreadcrumbItemType {
    title: string;
    href?: string;
}

const props = defineProps<{
    breadcrumbs: BreadcrumbItemType[];
}>();

const home = { icon: 'pi pi-home', url: '/' };

const items = props.breadcrumbs.map((item) => ({
    label: item.title,
    url: item.href,
}));
</script>

<template>
    <Breadcrumb :home="home" :model="items" />
</template>
