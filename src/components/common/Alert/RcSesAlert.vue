<template>
  <v-alert class="rc-alert" v-bind="alertProps" variant="flat" :class="classes">
    <!-- Title Slot -->
    <template v-if="$slots['title']" #title>
      <slot name="title" />
    </template>

    <!-- Text Slot -->
    <template v-if="$slots['text']" #text>
      <slot name="text" />
    </template>

    <!-- Prepend Slot -->
    <template v-if="$slots['prepend']" #prepend>
      <slot name="prepend" />
    </template>

    <!-- Default Slot -->
    <template #default>
      <slot />
    </template>

    <!-- Append Slot -->
    <template v-if="$slots['append']" #append>
      <slot name="append" />
    </template>

    <!-- Close Slot -->
    <template v-if="$slots['close']" #close="binds">
      <slot name="close" v-bind="binds" />
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AlertDefaults from '@/components/common/Alert/defaults'
import type { AlertProps } from '@/components/common/Alert/types'

import './style.scss'

const props = withDefaults(defineProps<AlertProps>(), AlertDefaults)

const classes = computed(() => {
  return {
    'rc-alert-light': props.variant === 'light',
    'rc-alert-dark': props.variant === 'dark',
    'bg-primary': props.type === 'scroll',
  }
})

const alertProps = computed(() => {
  const { type, icon, variant, ...rest } = props
  return {
    ...rest,
    type: type !== 'scroll' ? type : undefined,
    icon: type === 'scroll' && icon === undefined ? '$scroll' : icon,
  }
})
</script>
