<template>
  <v-tooltip
    v-model="visible"
    class="rc-ses-tooltip-v2"
    :location="props.placement"
    :offset="props.offset"
    :disabled="props.disabled"
    :max-width="props.maxWidth"
    :open-on-hover="props.openOnHover"
    :open-on-focus="props.openOnFocus"
    :open-on-click="props.openOnClick"
    :content-class="overlayClasses"
  >
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" :aria-label="activatorAriaLabel">
        <span
          v-bind="activatorProps"
          class="rc-ses-tooltip-v2__activator"
          role="button"
          :aria-label="activatorAriaLabel"
          :aria-disabled="props.disabled || undefined"
          :tabindex="props.disabled ? -1 : 0"
        >
          <v-icon icon="$tooltip" aria-hidden="true" />
        </span>
      </slot>
    </template>

    <div class="rc-ses-tooltip-v2__panel" role="tooltip">
      <slot>
        <p v-if="props.title" class="rc-ses-tooltip-v2__title">{{ props.title }}</p>
        <p v-if="bodyText" class="rc-ses-tooltip-v2__text">{{ bodyText }}</p>
      </slot>
    </div>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, ref } from 'vue'

import tooltipV2Defaults from '@/components/common/TooltipV2/defaults'
import type { TooltipV2Props } from '@/components/common/TooltipV2/types'

import './style.scss'

const props = withDefaults(defineProps<TooltipV2Props>(), tooltipV2Defaults)

const { t } = useTranslation()
const visible = ref(false)

const bodyText = computed(() => props.text ?? props.description)

const overlayClasses = computed(() => [
  'rc-ses-tooltip-v2__overlay',
  `rc-ses-tooltip-v2__overlay--${props.placement}`,
])

const activatorAriaLabel = computed(
  () =>
    props.accessibleLabel ?? t('RcSesTooltipV2.accessibleLabel', { ns: 'components' }),
)
</script>
