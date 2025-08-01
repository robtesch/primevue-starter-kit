<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <AuthLayout title="Confirm your password" description="This is a secure area of the application. Please confirm your password before continuing.">
        <Head title="Confirm password" />

        <form @submit.prevent="submit">
            <div class="space-y-6">
                <div class="grid gap-2">
                    <FloatLabel variant="on">
                        <Password
                            id="password"
                            class="w-full"
                            v-model="form.password"
                            required
                            autocomplete="current-password"
                            autofocus
                            :toggleMask="true"
                        />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>

                    <InputError :message="form.errors.password" />
                </div>

                <div class="flex items-center">
                    <Button class="w-full" :disabled="form.processing" :loading="form.processing"> Confirm Password </Button>
                </div>
            </div>
        </form>
    </AuthLayout>
</template>
