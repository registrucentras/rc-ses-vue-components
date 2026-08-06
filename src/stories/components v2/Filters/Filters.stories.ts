import type { Meta, StoryFn } from '@storybook/vue3'
import { computed, ref } from 'vue'

import RcSesFiltersV2 from '@/components/common/FiltersV2/RcSesFiltersV2.vue'
import type {
  FiltersFilter,
  FiltersModelValue,
  FiltersProps,
} from '@/components/common/FiltersV2/types'

const sampleFilters: FiltersFilter[] = [
  {
    id: 'filter-a',
    label: 'Filter A',
    options: [
      { value: 'a-1', title: 'Option A1' },
      { value: 'a-2', title: 'Option A2' },
      { value: 'a-3', title: 'Option A3' },
    ],
  },
  {
    id: 'filter-b',
    label: 'Filter B',
    options: [
      { value: 'b-1', title: 'Option B1' },
      { value: 'b-2', title: 'Option B2' },
      { value: 'b-3', title: 'Option B3' },
    ],
  },
  {
    id: 'filter-c',
    label: 'Filter C',
    options: [
      { value: 'c-1', title: 'Option C1' },
      { value: 'c-2', title: 'Option C2' },
    ],
  },
]

const manyFilters: FiltersFilter[] = [
  ...sampleFilters,
  {
    id: 'filter-d',
    label: 'Filter D',
    options: [
      { value: 'd-1', title: 'Option D1' },
      { value: 'd-2', title: 'Option D2' },
    ],
  },
  {
    id: 'filter-e',
    label: 'Filter E',
    options: [
      { value: 'e-1', title: 'Option E1' },
      { value: 'e-2', title: 'Option E2' },
    ],
  },
]

const meta: Meta<typeof RcSesFiltersV2> = {
  title: 'componentsV2/Filters',
  component: RcSesFiltersV2,
  tags: ['autodocs'],
  argTypes: {
    filters: {
      control: 'object',
      description:
        'Filter definitions (id, label, options) rendered as filter dropdowns.',
    },
    resultsSummary: {
      control: 'text',
      description:
        'Optional summary line below the bar (e.g. “Found 12 entries · 2 filters applied”). Parent-owned copy — not generated automatically. Use the `#summary` slot for custom markup.',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search field placeholder. Defaults to a generic i18n string.',
    },
    searchDebounceMs: {
      control: 'number',
      description:
        'Debounce (ms) before search value is written to the model. Default 300.',
    },
    maxVisibleFilters: {
      control: 'number',
      description:
        'How many filter dropdowns stay in the bar. Extra filters open in a flat “More filters” panel (grouped checkboxes, not nested dropdowns).',
    },
    showSearch: {
      control: 'boolean',
      description: 'Shows the leading search input in the bar / sheet.',
    },
    showClear: {
      control: 'boolean',
      description: 'Shows the “Clear filters” action on desktop.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables search, filter triggers, and clear.',
    },
    accessibleLabel: {
      control: 'text',
      description: 'Accessible name for the filters landmark wrapper.',
    },
    mobileBreakpoint: {
      control: 'number',
      description:
        'Viewport width below which the mobile bottom-sheet pattern is used. Default 720.',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesFiltersV2>

const defaultArgs: Partial<FiltersProps> = {
  filters: sampleFilters,
  showSearch: true,
  showClear: true,
  disabled: false,
  maxVisibleFilters: 4,
  searchPlaceholder: 'Search…',
  searchDebounceMs: 300,
}

export const Default: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({
      search: '',
      selections: { 'filter-a': ['a-1', 'a-2'] },
    })

    const summary = computed(() => {
      const selected = Object.values(value.value.selections).flat().length
      const found = Math.max(0, 24 - selected * 2 - (value.value.search ? 3 : 0))
      if (selected === 0) {
        return `Found ${found} entries`
      }
      return `Found ${found} entries · ${selected} filters applied`
    })

    return { args, value, summary }
  },
  template: `
    <RcSesFiltersV2
      v-bind="args"
      v-model="value"
      :results-summary="args.resultsSummary ?? summary"
    />
  `,
})
Default.args = defaultArgs as Meta<typeof RcSesFiltersV2>['args']

export const OverflowFilters: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({
      search: '',
      selections: { 'filter-d': ['d-1'] },
    })
    return { args, value }
  },
  template: `
    <RcSesFiltersV2 v-bind="args" v-model="value" />
  `,
})
OverflowFilters.args = {
  ...defaultArgs,
  filters: manyFilters,
  maxVisibleFilters: 2,
  resultsSummary: 'Found 8 entries · 1 filter applied',
} as Meta<typeof RcSesFiltersV2>['args']

export const MobileSheet: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({
      search: '',
      selections: { 'filter-a': ['a-1'] },
    })
    return { args, value }
  },
  template: `
    <RcSesFiltersV2 v-bind="args" v-model="value" />
  `,
})
MobileSheet.args = {
  ...defaultArgs,
  mobileBreakpoint: 9999,
  resultsSummary: 'Found 5 entries',
} as Meta<typeof RcSesFiltersV2>['args']

export const EmptyResults: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({
      search: 'query',
      selections: { 'filter-b': ['b-1'] },
    })
    return { args, value }
  },
  template: `
    <RcSesFiltersV2 v-bind="args" v-model="value" />
  `,
})
EmptyResults.args = {
  ...defaultArgs,
  resultsSummary:
    'No results found for the selected filters. Please reduce filtering or change your search query.',
} as Meta<typeof RcSesFiltersV2>['args']

export const WithoutSummary: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({ search: '', selections: {} })
    return { args, value }
  },
  template: `
    <RcSesFiltersV2 v-bind="args" v-model="value" />
  `,
})
WithoutSummary.args = defaultArgs as Meta<typeof RcSesFiltersV2>['args']

export const Disabled: Story = (args) => ({
  components: { RcSesFiltersV2 },
  setup() {
    const value = ref<FiltersModelValue>({
      search: '',
      selections: { 'filter-a': ['a-1'] },
    })
    return { args, value }
  },
  template: `
    <RcSesFiltersV2 v-bind="args" v-model="value" />
  `,
})
Disabled.args = {
  ...defaultArgs,
  disabled: true,
  resultsSummary: 'Found 10 entries',
} as Meta<typeof RcSesFiltersV2>['args']
