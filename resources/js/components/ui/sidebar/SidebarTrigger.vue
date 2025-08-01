<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import Button from 'primevue/button';
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    text
    rounded
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <i class="fa-solid fa-display" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
