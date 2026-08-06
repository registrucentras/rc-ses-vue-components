<template>
  <div :class="rootClasses">
    <div v-if="showLabelRow" class="rc-ses-input-v2__label-row">
      <label
        v-if="props.showLabel && props.label"
        class="rc-ses-input-v2__label"
        :for="inputId"
      >
        {{ props.label }}
        <span v-if="props.optional" class="rc-ses-input-v2__optional">
          {{ optionalSuffix }}
        </span>
      </label>

      <div
        v-if="props.showExplainer && props.explainer"
        class="rc-ses-input-v2__explainer"
        @click.stop
      >
        <slot name="explainer">
          <RcSesTooltipV2 :text="props.explainer" :title="props.explainerTitle" />
        </slot>
      </div>
    </div>

    <div :class="fieldClasses">
      <v-text-field
        v-bind="$attrs"
        :id="inputId"
        ref="fieldRef"
        v-model="fieldModel"
        class="rc-ses-input-v2__control"
        variant="plain"
        density="compact"
        hide-details
        single-line
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly || props.loading"
        :error="hasError"
        :aria-label="ariaLabel"
        :aria-describedby="describedBy"
        :aria-busy="props.loading || undefined"
        @update:focused="onFocused"
      >
        <template v-if="props.showLeading && $slots.leading" #prepend-inner>
          <div class="rc-ses-input-v2__leading">
            <slot name="leading" />
          </div>
        </template>

        <template v-if="showAppendInner" #append-inner>
          <div
            v-if="props.showTrailing && $slots.trailing"
            class="rc-ses-input-v2__trailing"
          >
            <slot name="trailing" />
          </div>
          <button
            v-if="showClearButton"
            type="button"
            class="rc-ses-input-v2__clear"
            :aria-label="clearAriaLabel"
            @mousedown.prevent
            @click="onClear"
          >
            <v-icon icon="$x" aria-hidden="true" />
          </button>
          <div v-if="props.loading" class="rc-ses-input-v2__loader">
            <RcSesLoaderV2 size="small" :show-label="false" />
          </div>
        </template>
      </v-text-field>
    </div>

    <p
      v-if="showHelperText"
      :id="helperId"
      class="rc-ses-input-v2__helper"
      :class="{ 'rc-ses-input-v2__helper--error': hasError }"
    >
      <slot name="helper">{{ helperText }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref, useSlots } from 'vue'

import RcSesLoaderV2 from '@/components/common/LoaderV2/RcSesLoaderV2.vue'
import RcSesTooltipV2 from '@/components/common/TooltipV2/RcSesTooltipV2.vue'
import inputV2Defaults from '@/components/common/inputs/InputV2/defaults'
import type { InputV2Props } from '@/components/common/inputs/InputV2/types'

import './style.scss'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputV2Props>(), inputV2Defaults)

const model = defineModel<string>({ default: '' })

const fieldModel = computed({
  get: () => model.value ?? '',
  set: (value: string | null) => {
    model.value = value ?? ''
  },
})

const emit = defineEmits<{
  clear: []
}>()

const { t } = useTranslation()
const slots = useSlots()

const focused = ref(false)
const fieldRef = ref<{ focus?: () => void; blur?: () => void } | null>(null)
const generatedId = uuidv4()

const inputId = computed(() => props.id ?? generatedId)
const helperId = computed(() => `${inputId.value}-helper`)

const hasError = computed(() => Boolean(props.error))

const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : undefined,
)

const helperText = computed(() => errorMessage.value || props.helper)

const showHelperText = computed(() => props.showHelper && Boolean(helperText.value))

const showLabelRow = computed(
  () =>
    (props.showLabel && Boolean(props.label)) ||
    (props.showExplainer && Boolean(props.explainer)),
)

const optionalSuffix = computed(() => t('RcSesInputV2.optional', { ns: 'components' }))

const clearAriaLabel = computed(() => t('RcSesInputV2.clear', { ns: 'components' }))

const ariaLabel = computed(() => {
  if (props.showLabel && props.label) {
    return undefined
  }

  return props.accessibleLabel ?? props.label
})

const describedBy = computed(() => (showHelperText.value ? helperId.value : undefined))

const canClear = computed(
  () =>
    props.clearable &&
    props.showTrailing &&
    !props.disabled &&
    !props.readonly &&
    !props.loading,
)

const showClearButton = computed(() => canClear.value && Boolean(fieldModel.value))

const showAppendInner = computed(
  () =>
    props.showTrailing &&
    (Boolean(props.loading) || Boolean(slots.trailing) || showClearButton.value),
)

const rootClasses = computed(() => [
  'rc-ses-input-v2',
  {
    'rc-ses-input-v2--disabled': props.disabled,
  },
])

const fieldClasses = computed(() => [
  'rc-ses-input-v2__field',
  {
    'rc-ses-input-v2__field--focused': focused.value && !props.disabled,
    'rc-ses-input-v2__field--error': hasError.value,
    'rc-ses-input-v2__field--disabled': props.disabled,
    'rc-ses-input-v2__field--loading': props.loading,
  },
])

const onFocused = (value: boolean) => {
  focused.value = value
}

const onClear = () => {
  fieldModel.value = ''
  emit('clear')
}

defineExpose({
  focus: () => fieldRef.value?.focus?.(),
  blur: () => fieldRef.value?.blur?.(),
})
</script>
