import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesDropdownV2 from '@/components/common/DropdownV2/RcSesDropdownV2.vue'
import type {
  DropdownV2Item,
  DropdownV2Props,
} from '@/components/common/DropdownV2/types'

const simpleItems: DropdownV2Item[] = [
  { value: 'option-a', title: 'Option A' },
  { value: 'option-b', title: 'Option B' },
  { value: 'option-c', title: 'Option C' },
  { value: 'option-d', title: 'Option D', disabled: true },
]

const groupedItems: DropdownV2Item[] = [
  {
    value: 'group-1',
    title: 'Group 1',
    count: 3,
    items: [
      { value: 'item-1a', title: 'Item 1A' },
      { value: 'item-1b', title: 'Item 1B' },
      { value: 'item-1c', title: 'Item 1C' },
    ],
  },
  {
    value: 'group-2',
    title: 'Group 2',
    count: 2,
    items: [
      { value: 'item-2a', title: 'Item 2A' },
      { value: 'item-2b', title: 'Item 2B', disabled: true },
    ],
  },
  {
    value: 'group-3',
    title: 'Group 3',
    count: 1,
    items: [{ value: 'item-3a', title: 'Item 3A' }],
  },
]

const meta: Meta<typeof RcSesDropdownV2> = {
  title: 'componentsV2/Dropdown',
  component: RcSesDropdownV2,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Flat or nested options shown in the panel.',
      control: 'object',
    },
    multiple: {
      description: 'Multi-select uses checkboxes; single uses a trailing checkmark.',
      control: 'boolean',
    },
    searchable: {
      description: 'Shows a search field at the top of the panel.',
      control: 'boolean',
    },
    searchPlaceholder: {
      description: 'Search field placeholder. Defaults to a generic i18n string.',
      control: 'text',
    },
    showAllOption: {
      description: 'Shows an “All” option at the top of the list.',
      control: 'boolean',
    },
    allOptionTitle: {
      description: 'Label for the “All” option. Defaults to i18n.',
      control: 'text',
    },
    allOptionValue: {
      description: 'Value emitted when “All” is selected.',
      control: 'text',
    },
    footerText: {
      description: 'Full footer line under the option list. Rendered as-is.',
      control: 'text',
    },
    label: {
      description: 'Field label above the trigger.',
      control: 'text',
    },
    helper: {
      description: 'Helper text below the trigger.',
      control: 'text',
    },
    error: {
      description: 'Error message, or `true` for error styling without a message.',
      control: 'text',
    },
    explainer: {
      description: 'Explainer tooltip text next to the label.',
      control: 'text',
    },
    explainerTitle: {
      description: 'Optional explainer tooltip title.',
      control: 'text',
    },
    placeholder: {
      description: 'Trigger placeholder when nothing is selected.',
      control: 'text',
    },
    accessibleLabel: {
      description: 'Accessible name when the visible label is hidden.',
      control: 'text',
    },
    disabled: {
      description: 'Disables the whole field.',
      control: 'boolean',
    },
    optional: {
      description: 'Shows an “(optional)” suffix after the label.',
      control: 'boolean',
    },
    showLabel: {
      description: 'Toggles the label row.',
      control: 'boolean',
    },
    showExplainer: {
      description: 'Toggles the explainer tooltip.',
      control: 'boolean',
    },
    showHelper: {
      description: 'Toggles helper / error text under the field.',
      control: 'boolean',
    },
    id: {
      description: 'Custom id for the trigger input.',
      control: 'text',
    },
    maxHeight: {
      description: 'Max height of the scrollable options area.',
      control: 'number',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesDropdownV2>

const defaultArgs: Partial<DropdownV2Props> = {
  label: 'Label',
  helper: 'Helper text',
  placeholder: 'Select…',
  explainer: 'Additional information about this field',
  items: simpleItems,
  searchable: true,
  showAllOption: false,
  showLabel: true,
  showHelper: true,
  showExplainer: true,
}

export const Default: Story = (args) => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string | null>(null)
    return { args, value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2 v-bind="args" v-model="value" />
    </div>
  `,
})
Default.args = defaultArgs

export const Simple: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string | null>('option-b')
    return { value, simpleItems }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2
        v-model="value"
        label="Simple list"
        helper="Flat options without groups"
        placeholder="Select…"
        :items="simpleItems"
        :show-all-option="false"
        :show-explainer="false"
      />
    </div>
  `,
})

export const Grouped: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string | null>(null)
    return { value, groupedItems }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2
        v-model="value"
        label="Grouped list"
        helper="Select a group or an item"
        placeholder="Select…"
        search-placeholder="Search"
        :items="groupedItems"
        show-all-option
        footer-text="3 more groups • 12 items"
        :show-explainer="false"
      />
    </div>
  `,
})

export const MultiSimple: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string[]>(['option-a', 'option-c'])
    return { value, simpleItems }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2
        v-model="value"
        label="Multi-select"
        helper="Select one or more options"
        multiple
        :items="simpleItems"
        :show-all-option="false"
        :show-explainer="false"
      />
    </div>
  `,
})

export const MultiGrouped: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string[]>(['item-1a', 'item-1b', 'item-1c'])
    return { value, groupedItems }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2
        v-model="value"
        label="Multi-select grouped"
        helper="Groups can select all nested items"
        multiple
        :items="groupedItems"
        show-all-option
        footer-text="Selected: 3 • 3 more groups"
        :show-explainer="false"
      />
    </div>
  `,
})

export const States: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    return {
      rest: ref(null),
      selected: ref('option-b'),
      disabled: ref(null),
      error: ref(null),
      simpleItems,
    }
  },
  template: `
    <div style="display: grid; gap: 24px; max-width: 360px;">
      <RcSesDropdownV2
        v-model="rest"
        label="Rest"
        placeholder="Select…"
        :items="simpleItems"
        :show-explainer="false"
        :show-all-option="false"
      />
      <RcSesDropdownV2
        v-model="selected"
        label="Selected"
        :items="simpleItems"
        :show-explainer="false"
        :show-all-option="false"
      />
      <RcSesDropdownV2
        v-model="disabled"
        label="Disabled"
        disabled
        :items="simpleItems"
        :show-explainer="false"
        :show-all-option="false"
      />
      <RcSesDropdownV2
        v-model="error"
        label="Error"
        error="Select an option"
        :items="simpleItems"
        :show-explainer="false"
        :show-all-option="false"
      />
    </div>
  `,
})

export const Optional: Story = () => ({
  components: { RcSesDropdownV2 },
  setup() {
    const value = ref<string | null>(null)
    return { value, simpleItems }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDropdownV2
        v-model="value"
        label="Secondary choice"
        optional
        placeholder="Select…"
        :items="simpleItems"
        :show-all-option="false"
        :show-explainer="false"
      />
    </div>
  `,
})
