<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

// Components
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';

const visible = ref(false);

const form = useForm({
    password: '',
});

const deleteUser = (e: Event) => {
    e.preventDefault();

    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            closeModal();
            visible.value = false;
        },
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    form.clearErrors();
    form.reset();
};
</script>

<template>
    <div class="space-y-6">
        <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
        <div class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
            <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
                <p class="font-medium">Warning</p>
                <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
            </div>
            <Button severity="danger" @click="visible = true">Delete account</Button>

            <Dialog
                v-model:visible="visible"
                modal
                header="Are you sure you want to delete your account?"
                class="w-[80vw]"
                @after-hide="form.resetAndClearErrors()"
            >
                <template #default>
                    <form @submit.prevent="deleteUser">
                        Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to
                        confirm you would like to permanently delete your account.

                        <div class="mt-4 grid gap-2">
                            <FloatLabel variant="on">
                                <Password
                                    id="password"
                                    v-model="form.password"
                                    name="password"
                                    placeholder="Password"
                                    fluid
                                    :toggle-mask="true"
                                    :feedback="false"
                                    :invalid="form.errors.password !== undefined"
                                />
                                <label for="password">Password</label>
                            </FloatLabel>
                            <InputError :message="form.errors.password" />
                        </div>
                    </form>
                </template>
                <template #footer>
                    <Button severity="secondary" @click="visible = false"> Cancel </Button>
                    <Button type="submit" severity="danger" :disabled="form.processing" @click="deleteUser"> Delete account </Button>
                </template>
            </Dialog>
        </div>
    </div>
</template>
