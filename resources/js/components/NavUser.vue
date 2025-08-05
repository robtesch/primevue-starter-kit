<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { AppPageProps, User } from '@/types';
import { router, usePage } from '@inertiajs/vue3';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { computed, useTemplateRef } from 'vue';

const props = defineProps<{ state: 'expanded' | 'collapsed' }>();

const page = usePage<AppPageProps>();
const user = page.props.auth.user as User;

const userMenu = useTemplateRef('userMenu');

const userMenuItems = computed((): MenuItem[] => {
    return [
        {
            separator: true,
        },
        {
            label: 'Settings',
            icon: 'fa-solid fa-gear',
            command: () => {
                router.visit(route('profile.edit'));
            },
        },
        {
            label: 'Log out',
            icon: 'fa-solid fa-arrow-right-from-bracket',
            command: () => {
                router.post(route('logout'));
            },
        },
    ];
});
</script>

<template>
    <Menu ref="userMenu" :model="userMenuItems" popup>
        <template #start>
            <div class="flex items-center gap-2 p-2 text-left text-sm">
                <UserInfo :user="user" :show-email="true" />
            </div>
        </template>
    </Menu>

    <div class="flex items-center justify-between">
        <Button text fluid @click="userMenu?.toggle($event)">
            <UserInfo :user="user" :show-name="props.state === 'expanded'" />
            <i v-if="props.state === 'expanded'" class="fa-solid fa-chevron-right ml-auto" />
        </Button>
    </div>
</template>
