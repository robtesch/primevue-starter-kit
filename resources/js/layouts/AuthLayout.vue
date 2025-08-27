<script setup lang="ts">
import AuthSimpleLayout from '@/layouts/auth/AuthSimpleLayout.vue';

const props = defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <AuthSimpleLayout :title="props.title" :description="props.description">
        <slot />
    </AuthSimpleLayout>
</template>
