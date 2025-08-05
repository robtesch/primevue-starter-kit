<script setup lang="ts">
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';

interface Props {
    items: MenuItem[];
    state: 'expanded' | 'collapsed';
}

const props = defineProps<Props>();
</script>

<template>
    <Menu
        :model="props.items"
        class="border-none bg-transparent"
        :class="{ 'w-(--sidebar-width-icon) min-w-(--sidebar-width-icon)': props.state === 'collapsed' }"
    >
        <template #submenuheader="{ item }">
            <span
                v-show="props.state === 'expanded'"
                class="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
                >{{ item.label }}</span
            >
        </template>
        <template #item="{ item }">
            <a v-tooltip="props.state === 'collapsed' ? item.label : undefined" :href="item.url" class="p-menu-item-link">
                <span v-if="item.icon" class="p-menu-item-icon" :class="item.icon" />
                <span v-if="item.label && props.state === 'expanded'" class="p-menu-item-label text-sm">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
