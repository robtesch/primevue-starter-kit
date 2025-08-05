<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import SelectButton from 'primevue/selectbutton';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', icon: 'fa-solid fa-sun', label: 'Light' },
    { value: 'dark', icon: 'fa-solid fa-moon', label: 'Dark' },
    { value: 'system', icon: 'fa-solid fa-desktop', label: 'System' },
];
</script>

<template>
    <SelectButton
        :model-value="appearance"
        :options="tabs"
        option-value="value"
        option-label="label"
        data-key="value"
        :allow-empty="false"
        @update:model-value="updateAppearance"
    >
        <template #option="slotProps">
            <i class="-ml-1 h-4 w-4" :class="slotProps.option.icon" />
            <span class="ml-1.5 text-sm">{{ slotProps.option.label }}</span>
        </template>
    </SelectButton>
</template>
