<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { AppPageProps, type User } from '@/types';
import { router, usePage } from '@inertiajs/vue3';
import { ChevronsUpDown } from 'lucide-vue-next';
import Menu from 'primevue/menu';
import { computed, ref } from 'vue';

const page = usePage<AppPageProps>();
const user = page.props.auth.user as User;

const userMenu = ref();

const toggleUserMenu = (event: Event) => {
    userMenu.value.toggle(event);
};

const userMenuItems = computed(() => [
    {
        label: user.name,
        class: 'font-semibold text-sm px-3 py-2',
    },
    {
        separator: true,
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
            router.visit(route('profile.edit'));
        },
    },
    {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => {
            router.post(route('logout'));
        },
    },
]);
</script>

<template>
    <Menu :model="userMenuItems" popup ref="userMenu">
        <template #item="{ item, props }">
            <a v-ripple :href="item.route" v-bind="props.action" class="flex items-center">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </template>
    </Menu>

    <div class="flex items-center justify-between p-4">
        <Button text rounded class="w-full justify-start" @click="toggleUserMenu">
            <UserInfo :user="user" />
            <ChevronsUpDown class="ml-auto size-4" />
        </Button>
    </div>
</template>
