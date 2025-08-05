<script setup lang="ts">
interface Props {
    variant?: 'header' | 'sidebar';
    class?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <main
        v-if="props.variant === 'sidebar'"
        class="relative m-2 flex w-[calc((100%)-var(--sidebar-width)-(--spacing(4)))] flex-1 flex-col bg-background md:ml-0 md:rounded-xl md:shadow-sm"
        :class="props.class"
    >
        <slot />
    </main>
    <main v-else class="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" :class="props.class">
        <slot />
    </main>
</template>
