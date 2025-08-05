<script setup lang="ts">
interface Props {
    title: string;
    description?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="mb-8 space-y-0.5">
        <h2 class="text-xl font-semibold tracking-tight">{{ props.title }}</h2>
        <p v-if="props.description" class="text-sm text-muted-foreground">
            {{ props.description }}
        </p>
    </div>
</template>
