<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';

interface Props {
    token: string;
    email: string;
}

const props = defineProps<Props>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <AuthLayout title="Reset password" description="Please enter your new password below">
        <Head title="Reset password" />

        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <FloatLabel variant="on">
                        <InputText
                            id="email"
                            v-model="form.email"
                            type="email"
                            name="email"
                            autocomplete="email"
                            fluid
                            readonly
                            :invalid="form.errors.email !== undefined"
                        />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <InputError :message="form.errors.email" class="mt-2" />
                </div>

                <div class="grid gap-2">
                    <FloatLabel variant="on">
                        <Password
                            id="password"
                            v-model="form.password"
                            name="password"
                            autocomplete="new-password"
                            fluid
                            autofocus
                            placeholder="Password"
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
                            name="password_confirmation"
                            autocomplete="new-password"
                            fluid
                            placeholder="Confirm password"
                            :toggle-mask="true"
                            :feedback="false"
                            :invalid="form.errors.password_confirmation !== undefined"
                        />
                        <label for="password_confirmation"> Confirm Password </label>
                    </FloatLabel>
                    <InputError :message="form.errors.password_confirmation" />
                </div>

                <Button type="submit" class="mt-4 w-full" :disabled="form.processing" :loading="form.processing"> Reset password </Button>
            </div>
        </form>
    </AuthLayout>
</template>
