<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
</script>

<template>
    <AppShell>
        <AppContent class="overflow-x-hidden">
            <AppSidebarHeader />
            <slot />
        </AppContent>
    </AppShell>
</template>
