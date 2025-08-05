<script setup lang="ts">
interface Props {
    title: string;
    description?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <header>
        <h3 class="mb-0.5 text-base font-medium">{{ props.title }}</h3>
        <p v-if="props.description" class="text-sm text-muted-foreground">
            {{ props.description }}
        </p>
    </header>
</template>
