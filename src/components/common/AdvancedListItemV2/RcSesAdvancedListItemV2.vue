<template>
  <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -- tabindex bound when selectable: 0 enabled / -1 disabled -->
  <li
    :class="[
      rootClasses,
      {
        'rc-ses-advanced-list-item-v2--no-start': !(
          (props.showLeading && $slots.leading) ||
          (props.showLeadingMedia && $slots['leading-media'])
        ),
        'rc-ses-advanced-list-item-v2--no-trailing': !(
          props.showTrailing && $slots.trailing
        ),
      },
    ]"
    :style="rootStyle"
    :role="isListboxOption ? 'option' : undefined"
    :tabindex="tabIndex"
    :aria-selected="isListboxOption ? props.selected : undefined"
    :aria-disabled="props.disabled || undefined"
    @click="handleSelect"
    @keydown.enter.self.prevent="handleSelect"
    @keydown.space.self.prevent="handleSelect"
  >
    <div class="rc-ses-advanced-list-item-v2__body">
      <div
        v-if="
          (props.showLeading && $slots.leading) ||
          (props.showLeadingMedia && $slots['leading-media'])
        "
        class="rc-ses-advanced-list-item-v2__start"
      >
        <div
          v-if="props.showLeading && $slots.leading"
          class="rc-ses-advanced-list-item-v2__leading"
        >
          <slot name="leading" />
        </div>

        <div
          v-if="props.showLeadingMedia && $slots['leading-media']"
          class="rc-ses-advanced-list-item-v2__leading-media"
          aria-hidden="true"
        >
          <slot name="leading-media" />
        </div>
      </div>

      <div class="rc-ses-advanced-list-item-v2__content">
        <div class="rc-ses-advanced-list-item-v2__title-row">
          <p class="rc-ses-advanced-list-item-v2__title">
            <slot name="title">{{ props.title }}</slot>
          </p>
          <div
            v-if="props.showBadge && $slots.badge"
            class="rc-ses-advanced-list-item-v2__badge"
          >
            <slot name="badge" />
          </div>
        </div>

        <p
          v-if="props.showSubtitle && props.subtitle"
          class="rc-ses-advanced-list-item-v2__subtitle"
        >
          {{ props.subtitle }}
        </p>

        <div
          v-if="props.showMeta && $slots.meta"
          class="rc-ses-advanced-list-item-v2__meta"
        >
          <slot name="meta" />
        </div>

        <div v-if="$slots.default" class="rc-ses-advanced-list-item-v2__description">
          <slot />
        </div>
      </div>

      <div
        v-if="props.showTrailing && $slots.trailing"
        class="rc-ses-advanced-list-item-v2__trailing"
        @click.stop
        @keydown.stop
      >
        <slot name="trailing" />
      </div>
    </div>

    <div
      v-if="props.showExpanded && $slots.expanded"
      class="rc-ses-advanced-list-item-v2__expanded"
      @click.stop
      @keydown.stop
    >
      <slot name="expanded" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

import advancedListItemV2Defaults from '@/components/common/AdvancedListItemV2/defaults'
import type { AdvancedListItemProps } from '@/components/common/AdvancedListItemV2/types'
import { advancedListV2Key } from '@/components/common/AdvancedListV2/context'

import './style.scss'

const props = withDefaults(
  defineProps<AdvancedListItemProps>(),
  advancedListItemV2Defaults,
)

const emit = defineEmits<{
  select: []
}>()

const listContext = inject(advancedListV2Key, null)

const isListboxOption = computed(() => props.selectable && !!listContext?.isListbox.value)

const tabIndex = computed(() => {
  if (!props.selectable) {
    return undefined
  }

  return props.disabled ? -1 : 0
})

const rootClasses = computed(() => [
  'rc-ses-advanced-list-item-v2',
  `rc-ses-advanced-list-item-v2--${props.container}`,
  `rc-ses-advanced-list-item-v2--wrap-${props.wrap}`,
  {
    'rc-ses-advanced-list-item-v2--selectable': props.selectable,
    'rc-ses-advanced-list-item-v2--selected': props.selected,
    'rc-ses-advanced-list-item-v2--disabled': props.disabled,
    'rc-ses-advanced-list-item-v2--error': props.error,
  },
])

const rootStyle = computed(() => {
  if (!props.level) {
    return undefined
  }

  return {
    '--rc-ses-list-item-level': String(props.level),
  }
})

const handleSelect = () => {
  if (!props.selectable || props.disabled) {
    return
  }

  emit('select')
}
</script>
