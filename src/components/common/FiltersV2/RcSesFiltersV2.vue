<template>
  <div
    class="rc-ses-filters-v2"
    :class="{ 'rc-ses-filters-v2--mobile': isMobile }"
    :aria-label="props.accessibleLabel || undefined"
  >
    <template v-if="isMobile">
      <button
        type="button"
        class="rc-ses-filters-v2__mobile-trigger"
        :disabled="props.disabled"
        :aria-expanded="sheetOpen"
        aria-haspopup="dialog"
        :aria-controls="sheetId"
        @click="openSheet"
      >
        <span>{{ mobileTriggerLabel }}</span>
        <RcSesBadgeV2
          v-if="appliedSelectionCount > 0"
          type="brand"
          size="small"
          :show-icon="false"
          :ripple="false"
        >
          {{ appliedSelectionCount }}
        </RcSesBadgeV2>
        <span class="rc-ses-filters-v2__mobile-caret" aria-hidden="true">
          <v-icon icon="$caretDown" />
        </span>
      </button>

      <v-bottom-sheet
        :id="sheetId"
        v-model="sheetOpen"
        class="rc-ses-filters-v2__sheet-dialog"
        content-class="rc-ses-filters-v2__sheet"
        scrim
      >
        <div
          class="rc-ses-filters-v2__sheet-panel"
          role="dialog"
          :aria-labelledby="sheetTitleId"
        >
          <div class="rc-ses-filters-v2__sheet-grabber" aria-hidden="true" />
          <h2 :id="sheetTitleId" class="rc-ses-filters-v2__sheet-title">
            {{ sheetTitle }}
          </h2>

          <div v-if="props.showSearch" class="rc-ses-filters-v2__sheet-search">
            <RcSesInputV2
              v-model="draftSearch"
              :placeholder="searchPlaceholderText"
              :show-label="false"
              :show-explainer="false"
              :show-helper="false"
              clearable
              :accessible-label="searchPlaceholderText"
            >
              <template #leading>
                <v-icon icon="$search" aria-hidden="true" />
              </template>
            </RcSesInputV2>
          </div>

          <div class="rc-ses-filters-v2__sheet-groups">
            <section
              v-for="filter in props.filters"
              :key="filter.id"
              class="rc-ses-filters-v2__sheet-group"
            >
              <h3 class="rc-ses-filters-v2__sheet-group-title">{{ filter.label }}</h3>
              <ul
                class="rc-ses-filters-v2__sheet-options"
                role="listbox"
                aria-multiselectable="true"
              >
                <li
                  v-for="option in filter.options"
                  :key="String(option.value)"
                  class="rc-ses-filters-v2__sheet-option"
                  role="option"
                  :aria-selected="isDraftSelected(filter.id, option.value)"
                >
                  <RcSesCheckboxV2
                    :model-value="isDraftSelected(filter.id, option.value)"
                    :label="option.title"
                    :show-label="true"
                    :disabled="option.disabled || filter.disabled"
                    @update:model-value="toggleDraft(filter.id, option.value)"
                  />
                </li>
              </ul>
            </section>
          </div>

          <div class="rc-ses-filters-v2__sheet-footer">
            <RcSesButtonV2 variant="secondary" @click="clearDraft">
              {{ clearShortLabel }}
            </RcSesButtonV2>
            <RcSesButtonV2 variant="primary" @click="applyDraft">
              {{ applyLabel }}
            </RcSesButtonV2>
          </div>
        </div>
      </v-bottom-sheet>
    </template>

    <template v-else>
      <div class="rc-ses-filters-v2__bar">
        <div v-if="props.showSearch" class="rc-ses-filters-v2__search">
          <RcSesInputV2
            v-model="searchInput"
            :placeholder="searchPlaceholderText"
            :show-label="false"
            :show-explainer="false"
            :show-helper="false"
            :disabled="props.disabled"
            clearable
            :accessible-label="searchPlaceholderText"
          >
            <template #leading>
              <v-icon icon="$search" aria-hidden="true" />
            </template>
          </RcSesInputV2>
        </div>

        <RcSesFilterDropdownV2
          v-for="filter in visibleFilters"
          :key="filter.id"
          :label="filter.label"
          :options="filter.options"
          :disabled="props.disabled || filter.disabled"
          :model-value="selectionsFor(filter.id)"
          @update:model-value="(value) => setSelection(filter.id, value)"
        />

        <v-menu
          v-if="overflowFilters.length > 0"
          v-model="moreOpen"
          :close-on-content-click="false"
          :disabled="props.disabled"
          location="bottom"
          offset="4"
        >
          <template #activator="{ props: menuProps }">
            <button
              v-bind="menuProps"
              type="button"
              class="rc-ses-filters-v2__more"
              :disabled="props.disabled"
              :aria-expanded="moreOpen"
              aria-haspopup="dialog"
            >
              <span>{{ moreFiltersLabel }}</span>
              <RcSesBadgeV2
                v-if="overflowSelectionCount > 0"
                type="brand"
                size="small"
                :show-icon="false"
                :ripple="false"
              >
                {{ overflowSelectionCount }}
              </RcSesBadgeV2>
              <span
                class="rc-ses-filters-v2__more-caret"
                :class="{ 'rc-ses-filters-v2__more-caret--open': moreOpen }"
                aria-hidden="true"
              >
                <v-icon icon="$caretDown" />
              </span>
            </button>
          </template>

          <div
            class="rc-ses-filters-v2__more-panel"
            role="dialog"
            :aria-label="moreFiltersLabel"
          >
            <section
              v-for="filter in overflowFilters"
              :key="filter.id"
              class="rc-ses-filters-v2__more-group"
            >
              <h3 class="rc-ses-filters-v2__more-group-title">{{ filter.label }}</h3>
              <ul
                class="rc-ses-filters-v2__more-options"
                role="listbox"
                aria-multiselectable="true"
                :aria-label="filter.label"
              >
                <li
                  v-for="option in filter.options"
                  :key="String(option.value)"
                  class="rc-ses-filters-v2__more-option"
                  role="option"
                  :aria-selected="isSelected(filter.id, option.value)"
                >
                  <RcSesCheckboxV2
                    :model-value="isSelected(filter.id, option.value)"
                    :label="option.title"
                    :show-label="true"
                    :disabled="option.disabled || filter.disabled || props.disabled"
                    @update:model-value="toggleSelection(filter.id, option.value)"
                  />
                </li>
              </ul>
            </section>
          </div>
        </v-menu>

        <div class="rc-ses-filters-v2__spacer" aria-hidden="true" />

        <button
          v-if="props.showClear"
          type="button"
          class="rc-ses-filters-v2__clear"
          :class="{ 'rc-ses-filters-v2__clear--inactive': !hasActiveFilters }"
          :disabled="props.disabled || !hasActiveFilters"
          @click="clearAll"
        >
          {{ clearLabel }}
        </button>
      </div>
    </template>

    <div
      v-if="props.resultsSummary || $slots.summary"
      class="rc-ses-filters-v2__summary"
      aria-live="polite"
    >
      <slot name="summary">{{ props.resultsSummary }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, getCurrentInstance, onBeforeUnmount, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import RcSesFilterDropdownV2 from '@/components/common/FilterDropdownV2/RcSesFilterDropdownV2.vue'
import type { FilterDropdownValue } from '@/components/common/FilterDropdownV2/types'
import filtersV2Defaults, {
  emptyFiltersModel,
} from '@/components/common/FiltersV2/defaults'
import type {
  FiltersModelValue,
  FiltersProps,
  FiltersSelections,
} from '@/components/common/FiltersV2/types'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'

import './style.scss'

const props = withDefaults(defineProps<FiltersProps>(), filtersV2Defaults)

const model = defineModel<FiltersModelValue>({ default: emptyFiltersModel })

const { t } = useTranslation()
const { width } = useDisplay()
const uid = getCurrentInstance()?.uid ?? 0
const sheetId = `rc-ses-filters-v2-sheet-${uid}`
const sheetTitleId = `rc-ses-filters-v2-sheet-title-${uid}`

const sheetOpen = ref(false)
const moreOpen = ref(false)
const searchInput = ref(model.value.search ?? '')
const draftSearch = ref('')
const draftSelections = ref<FiltersSelections>({})
let searchTimer: ReturnType<typeof setTimeout> | undefined

const isMobile = computed(() => width.value < props.mobileBreakpoint)

const searchPlaceholderText = computed(
  () =>
    props.searchPlaceholder ??
    t('RcSesFiltersV2.searchPlaceholder', { ns: 'components' }),
)

const clearLabel = computed(() => t('RcSesFiltersV2.clear', { ns: 'components' }))
const clearShortLabel = computed(() =>
  t('RcSesFiltersV2.clearShort', { ns: 'components' }),
)
const sheetTitle = computed(() => t('RcSesFiltersV2.sheetTitle', { ns: 'components' }))
const moreFiltersLabel = computed(() =>
  t('RcSesFiltersV2.moreFilters', { ns: 'components' }),
)
const mobileTriggerLabel = computed(() =>
  t('RcSesFiltersV2.mobileTrigger', { ns: 'components' }),
)

const countSelections = (selections: FiltersSelections) =>
  Object.values(selections).reduce((sum, values) => sum + (values?.length ?? 0), 0)

const appliedSelectionCount = computed(() =>
  countSelections(model.value.selections ?? {}),
)

const draftSelectionCount = computed(() => countSelections(draftSelections.value))

const applyLabel = computed(() =>
  t('RcSesFiltersV2.apply', {
    ns: 'components',
    count: draftSelectionCount.value,
  }),
)

const hasActiveFilters = computed(
  () => Boolean(model.value.search?.trim()) || appliedSelectionCount.value > 0,
)

const visibleFilters = computed(() =>
  (props.filters ?? []).slice(0, props.maxVisibleFilters),
)

const overflowFilters = computed(() =>
  (props.filters ?? []).slice(props.maxVisibleFilters),
)

const overflowSelectionCount = computed(() =>
  overflowFilters.value.reduce(
    (sum, filter) => sum + (model.value.selections?.[filter.id]?.length ?? 0),
    0,
  ),
)

const selectionsFor = (id: string): FilterDropdownValue[] =>
  model.value.selections?.[id] ?? []

const isSelected = (filterId: string, value: FilterDropdownValue) =>
  Boolean(model.value.selections?.[filterId]?.includes(value))

const setSelection = (id: string, value: FilterDropdownValue[]) => {
  model.value = {
    ...model.value,
    selections: {
      ...model.value.selections,
      [id]: value,
    },
  }
}

const toggleSelection = (filterId: string, value: FilterDropdownValue) => {
  const current = [...(model.value.selections?.[filterId] ?? [])]
  const index = current.indexOf(value)

  if (index >= 0) {
    current.splice(index, 1)
  } else {
    current.push(value)
  }

  setSelection(filterId, current)
}

const isDraftSelected = (filterId: string, value: FilterDropdownValue) =>
  Boolean(draftSelections.value[filterId]?.includes(value))

const toggleDraft = (filterId: string, value: FilterDropdownValue) => {
  const current = [...(draftSelections.value[filterId] ?? [])]
  const index = current.indexOf(value)

  if (index >= 0) {
    current.splice(index, 1)
  } else {
    current.push(value)
  }

  draftSelections.value = {
    ...draftSelections.value,
    [filterId]: current,
  }
}

const cloneSelections = (selections: FiltersSelections): FiltersSelections => {
  const next: FiltersSelections = {}
  Object.entries(selections ?? {}).forEach(([key, values]) => {
    next[key] = [...(values ?? [])]
  })
  return next
}

const openSheet = () => {
  draftSearch.value = model.value.search ?? ''
  draftSelections.value = cloneSelections(model.value.selections ?? {})
  sheetOpen.value = true
}

const clearDraft = () => {
  draftSearch.value = ''
  draftSelections.value = {}
}

const applyDraft = () => {
  model.value = {
    search: draftSearch.value,
    selections: cloneSelections(draftSelections.value),
  }
  searchInput.value = draftSearch.value
  sheetOpen.value = false
}

const clearAll = () => {
  model.value = emptyFiltersModel()
  searchInput.value = ''
}

const flushSearch = (value: string) => {
  if (model.value.search === value) {
    return
  }

  model.value = {
    ...model.value,
    search: value,
  }
}

watch(searchInput, (value) => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    flushSearch(value)
  }, props.searchDebounceMs)
})

watch(
  () => model.value.search,
  (value) => {
    if (value !== searchInput.value) {
      searchInput.value = value ?? ''
    }
  },
)

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})
</script>
