<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useSidebar } from '@/composables/useSidebar';
import Button from 'primevue/button';
import type { MenuItem } from 'primevue/menuitem';

const props = withDefaults(
    defineProps<{
        breadcrumbs?: MenuItem[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const { toggleSidebar } = useSidebar();
</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex items-center gap-2">
            <Button icon="fa-solid fa-bars" text @click="toggleSidebar" />
            <template v-if="props.breadcrumbs && props.breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="props.breadcrumbs" class="bg-transparent" />
            </template>
        </div>
    </header>
</template>
