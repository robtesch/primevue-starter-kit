<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { AppPageProps } from '@/types';
import { usePage } from '@inertiajs/vue3';

interface Props {
    variant?: 'header' | 'sidebar';
}

const props = defineProps<Props>();

const isOpen = usePage<AppPageProps>().props.sidebarOpen;
</script>

<template>
    <div v-if="props.variant === 'header'" class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
    <AppSidebar v-else :default-open="isOpen">
        <slot />
    </AppSidebar>
</template>
