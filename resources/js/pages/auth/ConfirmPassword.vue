<script setup lang="ts">
import InputError from '@/components/InputError.vue';
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

<script lang="ts">
import { createLayout } from '@/composables/createLayout';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
    layout: createLayout(AuthLayout, {
        title: 'Confirm your password',
        description: 'This is a secure area of the application. Please confirm your password before continuing.',
    }),
};
</script>

<template>
    <Head title="Confirm password" />

    <form @submit.prevent="submit">
        <div class="space-y-6">
            <div class="grid gap-2">
                <FloatLabel variant="on">
                    <Password
                        id="password"
                        v-model="form.password"
                        fluid
                        required
                        autocomplete="current-password"
                        autofocus
                        :toggle-mask="true"
                        :feedback="false"
                        :invalid="form.errors.password !== undefined"
                    />
                    <label for="password">Password</label>
                </FloatLabel>

                <InputError :message="form.errors.password" />
            </div>

            <div class="flex items-center">
                <Button fluid :disabled="form.processing" :loading="form.processing" type="submit"> Confirm Password </Button>
            </div>
        </div>
    </form>
</template>
