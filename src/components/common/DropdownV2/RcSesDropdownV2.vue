<template>
  <div class="rc-ses-dropdown-v2">
    <v-menu
      v-model="open"
      :close-on-content-click="false"
      :disabled="props.disabled"
      location="bottom"
      origin="auto"
      offset="4"
      max-width="100%"
      :content-class="'rc-ses-dropdown-v2__overlay'"
    >
      <template #activator="{ props: menuProps }">
        <div
          v-bind="menuProps"
          :class="triggerClasses"
          role="combobox"
          :aria-expanded="open"
          :aria-controls="listId"
          aria-haspopup="listbox"
          :aria-disabled="props.disabled || undefined"
          :aria-label="triggerAriaLabel"
          tabindex="0"
          @keydown="onTriggerKeydown"
        >
          <RcSesInputV2
            :id="inputId"
            :model-value="displayValue"
            :label="props.label"
            :helper="props.helper"
            :error="props.error"
            :explainer="props.explainer"
            :explainer-title="props.explainerTitle"
            :placeholder="props.placeholder"
            :accessible-label="props.accessibleLabel"
            :disabled="props.disabled"
            :optional="props.optional"
            :show-label="props.showLabel"
            :show-explainer="props.showExplainer"
            :show-helper="props.showHelper"
            readonly
            :show-leading="false"
            tabindex="-1"
          >
            <template #trailing>
              <span class="rc-ses-dropdown-v2__caret" aria-hidden="true">
                <v-icon :icon="open ? '$caretUp' : '$caretDown'" />
              </span>
            </template>
          </RcSesInputV2>
        </div>
      </template>

      <div
        class="rc-ses-dropdown-v2__panel"
        :style="panelStyle"
        @keydown="onPanelKeydown"
      >
        <div
          v-if="props.searchable"
          class="rc-ses-dropdown-v2__search"
          @keydown="onSearchKeydown"
        >
          <RcSesInputV2
            v-model="searchQuery"
            :placeholder="searchPlaceholderText"
            :show-label="false"
            :show-explainer="false"
            :show-helper="false"
            :aria-controls="listId"
          >
            <template #leading>
              <v-icon icon="$search" aria-hidden="true" />
            </template>
          </RcSesInputV2>
        </div>

        <ul
          :id="listId"
          class="rc-ses-dropdown-v2__list"
          role="listbox"
          :aria-multiselectable="props.multiple || undefined"
          :aria-label="props.label || props.accessibleLabel"
        >
          <!-- Keyboard navigation is handled on the trigger / listbox; tabindex follows activeIndex. -->
          <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/interactive-supports-focus, vuejs-accessibility/mouse-events-have-key-events -->
          <li
            v-for="(option, index) in flatOptions"
            :id="optionDomId(option.key)"
            :key="option.key"
            :class="optionClasses(option, index)"
            role="option"
            :aria-selected="isOptionChecked(option)"
            :aria-disabled="option.disabled || undefined"
            :tabindex="activeIndex === index ? 0 : -1"
            @click="onSelect(option)"
            @mouseenter="activeIndex = index"
            @focusin="activeIndex = index"
          >
            <span
              v-if="props.multiple"
              class="rc-ses-dropdown-v2__option-leading"
              @click.stop
            >
              <RcSesCheckboxV2
                :model-value="isOptionChecked(option)"
                :indeterminate="isIndeterminate(option)"
                :show-label="false"
                :accessible-label="option.title"
                :disabled="option.disabled"
                @update:model-value="onSelect(option)"
              />
            </span>

            <span class="rc-ses-dropdown-v2__option-body">
              <span class="rc-ses-dropdown-v2__option-title">{{ option.title }}</span>
            </span>

            <span
              v-if="option.count != null && option.count !== ''"
              class="rc-ses-dropdown-v2__option-meta"
            >
              <RcSesBadgeV2
                class="rc-ses-dropdown-v2__count"
                type="neutral"
                size="small"
                :show-icon="false"
                :ripple="false"
              >
                {{ option.count }}
              </RcSesBadgeV2>
            </span>

            <span
              v-if="!props.multiple && isSelected(option.value)"
              class="rc-ses-dropdown-v2__option-trailing"
              aria-hidden="true"
            >
              <v-icon icon="$checkBold" />
            </span>
          </li>

          <li
            v-if="flatOptions.length === 0"
            class="rc-ses-dropdown-v2__empty"
            role="presentation"
          >
            {{ emptyText }}
          </li>
        </ul>

        <p v-if="footerLabel" class="rc-ses-dropdown-v2__footer">
          {{ footerLabel }}
        </p>
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref, watch } from 'vue'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import dropdownV2Defaults from '@/components/common/DropdownV2/defaults'
import type {
  DropdownV2FlatOption,
  DropdownV2Item,
  DropdownV2Props,
  DropdownV2Value,
} from '@/components/common/DropdownV2/types'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'
import { useListboxKeyboard } from '@/composables/useListboxKeyboard'

import './style.scss'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownV2Props>(), dropdownV2Defaults)

const model = defineModel<DropdownV2Value | DropdownV2Value[] | null>({
  default: null,
})

const open = defineModel<boolean>('open', { default: false })

const { t } = useTranslation()

const generatedId = uuidv4()
const inputId = computed(() => props.id ?? generatedId)
const listId = computed(() => `${inputId.value}-list`)

const searchQuery = ref('')
const activeIndex = ref(-1)

const searchPlaceholderText = computed(
  () =>
    props.searchPlaceholder ??
    t('RcSesDropdownV2.searchPlaceholder', { ns: 'components' }),
)

const emptyText = computed(() => t('RcSesDropdownV2.empty', { ns: 'components' }))

const allOptionTitleText = computed(
  () => props.allOptionTitle ?? t('RcSesDropdownV2.all', { ns: 'components' }),
)

const footerLabel = computed(() => props.footerText || undefined)

const panelStyle = computed(() => ({
  '--rc-ses-dropdown-v2-max-height':
    typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
}))

const triggerClasses = computed(() => [
  'rc-ses-dropdown-v2__trigger',
  {
    'rc-ses-dropdown-v2__trigger--disabled': props.disabled,
    'rc-ses-dropdown-v2__trigger--open': open.value,
  },
])

const triggerAriaLabel = computed(() => {
  if (props.showLabel && props.label) {
    return undefined
  }

  return props.accessibleLabel ?? props.label
})

const flattenItems = (items: DropdownV2Item[], query: string): DropdownV2FlatOption[] => {
  const normalized = query.trim().toLowerCase()
  const matches = (title: string) =>
    !normalized || title.toLowerCase().includes(normalized)

  const result: DropdownV2FlatOption[] = []

  items.forEach((item) => {
    const children = item.items ?? []
    const childMatches = children.filter((child) => matches(child.title))
    const selfMatches = matches(item.title)

    if (children.length > 0) {
      if (!selfMatches && childMatches.length === 0) {
        return
      }

      const visibleChildren = selfMatches ? children : childMatches
      const enabledChildValues = children
        .filter((child) => !child.disabled && !item.disabled)
        .map((child) => child.value)
      const visibleSelectableValues = visibleChildren
        .filter((child) => !child.disabled && !item.disabled)
        .map((child) => child.value)

      result.push({
        key: `group-${String(item.value)}`,
        kind: 'group',
        value: item.value,
        title: item.title,
        count: item.count,
        disabled: item.disabled,
        childValues: enabledChildValues,
        visibleChildValues: visibleSelectableValues,
      })

      visibleChildren.forEach((child) => {
        result.push({
          key: `item-${String(item.value)}-${String(child.value)}`,
          kind: 'item',
          value: child.value,
          title: child.title,
          count: child.count,
          disabled: child.disabled || item.disabled,
          indented: true,
        })
      })

      return
    }

    if (!selfMatches) {
      return
    }

    result.push({
      key: `item-${String(item.value)}`,
      kind: 'item',
      value: item.value,
      title: item.title,
      count: item.count,
      disabled: item.disabled,
    })
  })

  return result
}

const flatOptions = computed(() => {
  const options: DropdownV2FlatOption[] = []

  if (props.showAllOption) {
    const allTitle = allOptionTitleText.value
    const query = searchQuery.value.trim().toLowerCase()
    if (!query || allTitle.toLowerCase().includes(query)) {
      options.push({
        key: 'all',
        kind: 'all',
        value: props.allOptionValue,
        title: allTitle,
      })
    }
  }

  options.push(...flattenItems(props.items ?? [], searchQuery.value))

  return options
})

const findTitleByValue = (
  items: DropdownV2Item[],
  value: DropdownV2Value,
): string | undefined => {
  const direct = items.find((item) => item.value === value)
  if (direct) {
    if (direct.count != null && direct.count !== '') {
      return `${direct.title} (${direct.count})`
    }

    return direct.title
  }

  return items
    .map((item) => (item.items ? findTitleByValue(item.items, value) : undefined))
    .find((title) => title != null)
}

const displayValue = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(model.value) ? model.value : []
    if (values.length === 0) {
      return ''
    }

    if (values.length === 1) {
      const first = values[0]
      if (first === undefined) {
        return ''
      }

      if (first === props.allOptionValue) {
        return allOptionTitleText.value
      }

      return findTitleByValue(props.items ?? [], first) ?? String(first)
    }

    return t('RcSesDropdownV2.selectedCount', {
      ns: 'components',
      count: values.length,
    })
  }

  if (model.value == null || model.value === '') {
    return ''
  }

  const value = model.value as DropdownV2Value

  if (value === props.allOptionValue) {
    return allOptionTitleText.value
  }

  return findTitleByValue(props.items ?? [], value) ?? String(value)
})

const isSelected = (value: DropdownV2Value) => {
  if (props.multiple) {
    return Array.isArray(model.value) && model.value.includes(value)
  }

  return model.value === value
}

const isOptionChecked = (option: DropdownV2FlatOption) => {
  if (props.multiple && option.kind === 'group' && option.childValues?.length) {
    return option.childValues.every((value) => isSelected(value))
  }

  return isSelected(option.value)
}

const isIndeterminate = (option: DropdownV2FlatOption) => {
  if (!props.multiple || option.kind !== 'group' || !option.childValues?.length) {
    return false
  }

  const selectedCount = option.childValues.filter((value) => isSelected(value)).length

  return selectedCount > 0 && selectedCount < option.childValues.length
}

const optionClasses = (option: DropdownV2FlatOption, index: number) => [
  'rc-ses-dropdown-v2__option',
  {
    'rc-ses-dropdown-v2__option--group': option.kind === 'group',
    'rc-ses-dropdown-v2__option--indented': option.indented,
    'rc-ses-dropdown-v2__option--selected': isOptionChecked(option),
    'rc-ses-dropdown-v2__option--disabled': option.disabled,
    'rc-ses-dropdown-v2__option--active': activeIndex.value === index,
  },
]

const optionDomId = (key: string) => `${listId.value}-${key}`

const onSelect = (option: DropdownV2FlatOption) => {
  if (option.disabled || props.disabled) {
    return
  }

  if (props.multiple) {
    let current = Array.isArray(model.value) ? [...model.value] : []

    if (option.kind === 'all') {
      model.value = current.includes(option.value) ? [] : [option.value]
      return
    }

    current = current.filter((value) => value !== props.allOptionValue)

    if (option.kind === 'group' && option.childValues?.length) {
      const queryActive = searchQuery.value.trim().length > 0
      const targets =
        queryActive && option.visibleChildValues?.length
          ? option.visibleChildValues
          : option.childValues

      if (targets.length === 0) {
        return
      }

      const allSelected = targets.every((value) => current.includes(value))

      if (allSelected) {
        model.value = current.filter((value) => !targets.includes(value))
      } else {
        model.value = [...new Set([...current, ...targets])]
      }

      return
    }

    const index = current.indexOf(option.value)
    if (index >= 0) {
      current.splice(index, 1)
    } else {
      current.push(option.value)
    }

    const groupValues = new Set(
      (props.items ?? [])
        .filter((item) => (item.items?.length ?? 0) > 0)
        .map((item) => item.value),
    )
    model.value = current.filter((value) => !groupValues.has(value))
    return
  }

  model.value = option.value
  open.value = false
}

const { onTriggerKeydown, onPanelKeydown } = useListboxKeyboard({
  open,
  activeIndex,
  disabled: () => props.disabled,
  getOptionCount: () => flatOptions.value.length,
  isOptionDisabled: (index) => Boolean(flatOptions.value[index]?.disabled),
  getOptionDomId: (index) => {
    const option = flatOptions.value[index]
    return option ? optionDomId(option.key) : ''
  },
  onActivate: (index) => {
    const option = flatOptions.value[index]
    if (option) {
      onSelect(option)
    }
  },
  getDefaultOpenIndex: () => {
    const selectedIndex = flatOptions.value.findIndex((option) => isOptionChecked(option))
    return selectedIndex >= 0 ? selectedIndex : 0
  },
  onOpen: () => {
    searchQuery.value = ''
  },
})

const onSearchKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'ArrowDown' ||
    event.key === 'ArrowUp' ||
    event.key === 'Home' ||
    event.key === 'End' ||
    event.key === 'Escape' ||
    (event.key === 'Enter' && activeIndex.value >= 0)
  ) {
    onPanelKeydown(event)
  }
}

watch(flatOptions, () => {
  if (!open.value || flatOptions.value.length === 0) {
    return
  }

  if (activeIndex.value >= flatOptions.value.length) {
    activeIndex.value = flatOptions.value.length - 1
  }
})
</script>
