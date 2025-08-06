<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Head, useForm } from '@inertiajs/vue3';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const props = defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '' as string | undefined,
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<script lang="ts">
import { createLayout } from '@/composables/createLayout';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
    layout: createLayout(AuthLayout, {
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    }),
};
</script>

<template>
    <Head title="Log in" />

    <div v-if="props.status" class="mb-4 text-center text-sm font-medium text-green-600">
        {{ props.status }}
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="submit">
        <div class="grid gap-6">
            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <InputText
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        autofocus
                        :tabindex="1"
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
                <div class="flex items-center justify-between">
                    <FloatLabel variant="on">
                        <Password
                            id="password"
                            v-model="form.password"
                            required
                            :tabindex="2"
                            autocomplete="current-password"
                            placeholder="Password"
                            fluid
                            :toggle-mask="true"
                            :feedback="false"
                            :invalid="form.errors.password !== undefined"
                        />
                        <label for="password">Password</label>
                    </FloatLabel>
                </div>
                <TextLink v-if="props.canResetPassword" :href="route('password.request')" class="text-sm"> Forgot password? </TextLink>
                <InputError :message="form.errors.password" />
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <Checkbox v-model="form.remember" input-id="remember" :binary="true" :tabindex="3" />
                    <label for="remember" class="text-muted-foreground">Remember me</label>
                </div>
            </div>

            <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="form.processing" :loading="form.processing"> Log in </Button>
        </div>

        <div class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <TextLink :href="route('register')">Sign up</TextLink>
        </div>
    </form>
</template>
