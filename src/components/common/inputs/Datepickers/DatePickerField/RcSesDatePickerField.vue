<template>
  <!-- SUPERSEDED: prefer RcSesDatePickerV2 for new work. Kept for migration. -->
  <RcSesFieldWrapper
    :label="fieldLabel"
    :description="fieldDescription"
    :tooltip="fieldTooltip"
    :tooltip-title="fieldTooltipTitle"
    :tooltip-on-click="fieldTooltipOnClick"
    :for="name"
    :required="required"
  >
    <RcSesDatePicker
      v-model="model"
      v-bind="{ ...$attrs, ...datePickerProps }"
      :range="range"
      :placeholder="placeholder"
      :name="name"
      :error="errorComputed"
      :disabled="disabled"
      :readonly="readonly"
      @update:model-value="veeField?.setValue($event)"
    >
      <template v-if="$slots['append-inner']" #append-inner="binds">
        <slot name="append-inner" v-bind="binds" />
      </template>
      <template v-if="$slots['clear']" #clear="binds">
        <slot name="clear" v-bind="binds" />
      </template>
      <template v-if="$slots['counter']" #counter="binds">
        <slot name="counter" v-bind="binds" />
      </template>
      <template v-if="$slots['loader']" #loader="binds">
        <slot name="loader" v-bind="binds" />
      </template>
      <template v-if="$slots['prepend']" #prepend="binds">
        <slot name="prepend" v-bind="binds" />
      </template>
      <template v-if="$slots['prepend-inner']" #prepend-inner="binds">
        <slot name="prepend-inner" v-bind="binds" />
      </template>
    </RcSesDatePicker>
  </RcSesFieldWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import RcSesDatePicker from '@/components/common/inputs/Datepickers/DatePicker/RcSesDatePicker.vue'
import RcSesFieldWrapper from '@/components/common/inputs/FieldWrapper/RcSesFieldWrapper.vue'

import { DatePickerFieldProps } from './types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DatePickerFieldProps>()
const model = defineModel<any>()

const { modelValue, modelModifiers, ...datePickerProps } = props

const errorComputed = computed(() => {
  return props.error || props.veeField?.errorMessage
})
</script>
