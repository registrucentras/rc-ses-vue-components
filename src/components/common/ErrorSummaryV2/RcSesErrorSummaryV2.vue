<template>
  <div
    v-if="normalizedErrors.length > 0"
    :id="rootId"
    ref="rootRef"
    class="rc-ses-error-summary-v2"
    tabindex="-1"
    :aria-labelledby="titleId"
  >
    <div class="rc-ses-error-summary-v2__header">
      <v-icon
        class="rc-ses-error-summary-v2__icon"
        icon="$warningCircleFilled"
        aria-hidden="true"
      />
      <h2 :id="titleId" class="rc-ses-error-summary-v2__title">
        {{ titleText }}
      </h2>
    </div>

    <ul class="rc-ses-error-summary-v2__list">
      <li
        v-for="(error, index) in normalizedErrors"
        :key="error.id ?? `${error.fieldId ?? 'error'}-${index}`"
        class="rc-ses-error-summary-v2__item"
      >
        <a
          v-if="error.fieldId"
          class="rc-ses-error-summary-v2__link"
          :href="`#${error.fieldId}`"
          @click="onErrorClick($event, error.fieldId)"
        >
          {{ error.message }}
        </a>
        <span v-else class="rc-ses-error-summary-v2__text">
          {{ error.message }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, nextTick, ref, watch } from 'vue'

import errorSummaryV2Defaults from '@/components/common/ErrorSummaryV2/defaults'
import type {
  ErrorSummaryItem,
  ErrorSummaryProps,
} from '@/components/common/ErrorSummaryV2/types'

import './style.scss'

const props = withDefaults(defineProps<ErrorSummaryProps>(), errorSummaryV2Defaults)

const { t } = useTranslation()

const rootRef = ref<HTMLElement | null>(null)
const generatedId = uuidv4()
const rootId = computed(() => `rc-ses-error-summary-v2-${generatedId}`)
const titleId = computed(() => `${rootId.value}-title`)

const titleText = computed(
  () => props.title ?? t('RcSesErrorSummaryV2.title', { ns: 'components' }),
)

const normalizedErrors = computed<ErrorSummaryItem[]>(() =>
  (props.errors ?? [])
    .map((error) => {
      if (typeof error === 'string') {
        const message = error.trim()
        return message ? { message } : null
      }

      const message = error.message?.trim()
      if (!message) {
        return null
      }

      return {
        message,
        fieldId: error.fieldId?.trim() || undefined,
        id: error.id,
      }
    })
    .filter((error): error is ErrorSummaryItem => error != null),
)

const focus = async () => {
  await nextTick()
  rootRef.value?.focus({ preventScroll: true })
  rootRef.value?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' })
}

const onErrorClick = (event: MouseEvent, fieldId: string) => {
  event.preventDefault()

  const target = document.getElementById(fieldId)
  if (!target) {
    return
  }

  target.focus({ preventScroll: true })
  target.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

watch(
  () => normalizedErrors.value.length,
  async (count, previousCount) => {
    if (!props.autofocus || count === 0) {
      return
    }

    if ((previousCount ?? 0) === 0) {
      await focus()
    }
  },
  { immediate: true },
)

defineExpose({
  focus,
})
</script>
