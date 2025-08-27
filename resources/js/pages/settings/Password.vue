<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/SettingsLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import type { MenuItem } from 'primevue/menuitem';
import Password from 'primevue/password';

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};

defineOptions({ layout: [AppLayout, SettingsLayout] });

const breadcrumbItems: MenuItem[] = [
    {
        label: 'Password settings',
        command: () => {
            router.visit(route('password.edit'));
        },
    },
];
</script>

<template>
    <Head title="Password settings" />

    <Teleport defer to="#breadcrumbs">
        <Breadcrumbs :breadcrumbs="breadcrumbItems" class="bg-transparent" />
    </Teleport>

    <div class="space-y-6">
        <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

        <form class="space-y-6" @submit.prevent="updatePassword">
            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="current_password"
                        v-model="form.current_password"
                        fluid
                        autocomplete="current-password"
                        placeholder="Current password"
                        :toggle-mask="true"
                        :feedback="false"
                        :invalid="form.errors.current_password !== undefined"
                    />
                    <label for="current_password">Current password</label>
                </FloatLabel>
                <InputError :message="form.errors.current_password" />
            </div>

            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="password"
                        v-model="form.password"
                        fluid
                        autocomplete="new-password"
                        placeholder="New password"
                        :toggle-mask="true"
                        :invalid="form.errors.password !== undefined"
                    />
                    <label for="password">New password</label>
                </FloatLabel>
                <InputError :message="form.errors.password" />
            </div>

            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        fluid
                        autocomplete="new-password"
                        placeholder="Confirm password"
                        :toggle-mask="true"
                        :feedback="false"
                        :invalid="form.errors.password_confirmation !== undefined"
                    />
                    <label for="password_confirmation">Confirm password</label>
                </FloatLabel>
                <InputError :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center gap-4">
                <Button :disabled="form.processing" :loading="form.processing" type="submit">Save password</Button>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </div>
</template>
