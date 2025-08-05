<script setup lang="ts">
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';

import DeleteUser from '@/components/DeleteUser.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { AppPageProps, type User } from '@/types';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import type { MenuItem } from 'primevue/menuitem';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

const props = defineProps<Props>();

const breadcrumbItems: MenuItem[] = [
    {
        label: 'Profile settings',
        command: () => {
            router.visit(route('profile.edit'));
        },
    },
];

const page = usePage<AppPageProps>();
const user = page.props.auth.user as User;

const form = useForm({
    name: user.name,
    email: user.email,
});

const submit = () => {
    console.log('submit', form);
    form.patch(route('profile.update'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-2">
                        <FloatLabel variant="on">
                            <InputText
                                id="name"
                                v-model="form.name"
                                fluid
                                required
                                autocomplete="name"
                                placeholder="Full name"
                                :invalid="form.errors.name !== undefined"
                            />
                            <label for="name">Name</label>
                        </FloatLabel>
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <FloatLabel variant="on">
                            <InputText
                                id="email"
                                v-model="form.email"
                                type="email"
                                fluid
                                required
                                autocomplete="username"
                                placeholder="Email address"
                                :invalid="form.errors.email !== undefined"
                            />
                            <label for="email">Email address</label>
                        </FloatLabel>
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div v-if="props.mustVerifyEmail && !user.email_verified_at">
                        <p class="-mt-4 text-sm text-muted-foreground">
                            Your email address is unverified.
                            <Link
                                :href="route('verification.send')"
                                method="post"
                                as="button"
                                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        <div v-if="props.status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="form.processing" :loading="form.processing" type="submit">Save</Button>

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

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
