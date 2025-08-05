<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Head, useForm } from '@inertiajs/vue3';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<script lang="ts">
import { createLayout } from '@/composables/createLayout';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
    layout: createLayout(AuthLayout, {
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    }),
};
</script>

<template>
    <Head title="Register" />

    <form class="flex flex-col gap-6" @submit.prevent="submit">
        <div class="grid gap-6">
            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <InputText
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="name"
                        placeholder="Full name"
                        fluid
                        :invalid="form.errors.name !== undefined"
                    />
                    <label for="name">Name</label>
                </FloatLabel>
                <InputError :message="form.errors.name" />
            </div>

            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <InputText
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        :tabindex="2"
                        autocomplete="email"
                        placeholder="email@example.com"
                        fluid
                        :invalid="form.errors.email !== undefined"
                    />
                    <label for="email">Email address</label>
                </FloatLabel>
                <InputError :message="form.errors.email" />
            </div>

            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="password"
                        v-model="form.password"
                        required
                        :tabindex="3"
                        autocomplete="new-password"
                        placeholder="Password"
                        fluid
                        :toggle-mask="true"
                        :invalid="form.errors.password !== undefined"
                    />
                    <label for="password">Password</label>
                </FloatLabel>
                <InputError :message="form.errors.password" />
            </div>

            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        required
                        :tabindex="4"
                        autocomplete="new-password"
                        placeholder="Confirm password"
                        fluid
                        :toggle-mask="true"
                        :feedback="false"
                        :invalid="form.errors.password_confirmation !== undefined"
                    />
                    <label for="password_confirmation">Confirm password</label>
                </FloatLabel>
                <InputError :message="form.errors.password_confirmation" />
            </div>

            <Button type="submit" class="mt-2 w-full" tabindex="5" :disabled="form.processing" :loading="form.processing"> Create account </Button>
        </div>

        <div class="text-center text-sm text-muted-foreground">
            Already have an account?
            <TextLink :href="route('login')" class="underline underline-offset-4">Log in</TextLink>
        </div>
    </form>
</template>
