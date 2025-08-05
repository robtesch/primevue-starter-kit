<script setup lang="ts">
import { useInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import Avatar from 'primevue/avatar';
import { computed } from 'vue';

interface Props {
    user: User;
    showEmail?: boolean;
    showName?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showEmail: false,
    showName: true,
});

const { getInitials } = useInitials();

// Compute whether we should show the avatar image
const showAvatar = computed(() => props.user.avatar && props.user.avatar !== '');
</script>

<template>
    <Avatar v-if="showAvatar" :image="user.avatar" shape="square" class="h-8 w-8 overflow-hidden rounded-lg" />
    <Avatar v-else :label="getInitials(user.name)" shape="square" class="h-8 w-8 overflow-hidden rounded-lg text-black dark:text-white" />

    <div v-if="props.showName" class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-medium">{{ user.name }}</span>
        <span v-if="props.showEmail" class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
    </div>
</template>
