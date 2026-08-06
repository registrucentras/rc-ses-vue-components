import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesFilterDropdownV2 from '@/components/common/FilterDropdownV2/RcSesFilterDropdownV2.vue'
import type {
  FilterDropdownOption,
  FilterDropdownProps,
} from '@/components/common/FilterDropdownV2/types'

const sampleOptions: FilterDropdownOption[] = [
  { value: 'option-1', title: 'Option 1' },
  { value: 'option-2', title: 'Option 2' },
  { value: 'option-3', title: 'Option 3' },
  { value: 'option-4', title: 'Option 4', disabled: true },
]

const meta: Meta<typeof RcSesFilterDropdownV2> = {
  title: 'componentsV2/FilterDropdown',
  component: RcSesFilterDropdownV2,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label on the pill trigger.',
    },
    options: {
      control: 'object',
      description: 'Selectable checkbox options shown in the listbox panel.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger and prevents opening the panel.',
    },
    accessibleLabel: {
      control: 'text',
      description: 'Accessible name for the trigger. Defaults to `label` when omitted.',
    },
    maxHeight: {
      control: 'number',
      description: 'Max height of the options list (px or CSS length).',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesFilterDropdownV2>

const defaultArgs: Partial<FilterDropdownProps> = {
  label: 'Filter',
  options: sampleOptions,
  disabled: false,
}

export const Default: Story = (args) => ({
  components: { RcSesFilterDropdownV2 },
  setup() {
    const value = ref<(string | number)[]>([])
    return { args, value }
  },
  template: `
    <RcSesFilterDropdownV2 v-bind="args" v-model="value" />
  `,
})
Default.args = defaultArgs as Meta<typeof RcSesFilterDropdownV2>['args']

export const WithSelection: Story = (args) => ({
  components: { RcSesFilterDropdownV2 },
  setup() {
    const value = ref<(string | number)[]>(['option-1', 'option-2'])
    return { args, value }
  },
  template: `
    <RcSesFilterDropdownV2 v-bind="args" v-model="value" />
  `,
})
WithSelection.args = {
  ...defaultArgs,
  label: 'Filter',
} as Meta<typeof RcSesFilterDropdownV2>['args']

export const Disabled: Story = (args) => ({
  components: { RcSesFilterDropdownV2 },
  setup() {
    const value = ref<(string | number)[]>(['option-1'])
    return { args, value }
  },
  template: `
    <RcSesFilterDropdownV2 v-bind="args" v-model="value" />
  `,
})
Disabled.args = {
  ...defaultArgs,
  disabled: true,
} as Meta<typeof RcSesFilterDropdownV2>['args']
