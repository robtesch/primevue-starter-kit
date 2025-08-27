<script setup lang="ts">
interface Props {
    class?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <main
        class="relative m-2 flex w-[calc((100%)-var(--sidebar-width)-(--spacing(4)))] flex-1 flex-col bg-background md:ml-1 md:rounded-xl md:shadow-sm"
        :class="props.class"
    >
        <slot />
    </main>
</template>
