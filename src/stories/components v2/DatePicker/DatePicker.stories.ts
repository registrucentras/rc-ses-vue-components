import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesDatePickerV2 from '@/components/common/DatePickerV2/RcSesDatePickerV2.vue'
import type {
  DatePickerV2Props,
  DatePickerV2RangeValue,
} from '@/components/common/DatePickerV2/types'

const meta: Meta<typeof RcSesDatePickerV2> = {
  title: 'componentsV2/DatePicker',
  component: RcSesDatePickerV2,
  tags: ['autodocs'],
  argTypes: {
    range: {
      description: 'Enables start/end range selection.',
      control: 'boolean',
    },
    format: {
      description: 'Display format for the trigger (date-fns).',
      control: 'text',
    },
    minDate: {
      description: 'Earliest selectable date (`yyyy-MM-dd`).',
      control: 'text',
    },
    maxDate: {
      description: 'Latest selectable date (`yyyy-MM-dd`).',
      control: 'text',
    },
    label: { description: 'Field label above the trigger.', control: 'text' },
    helper: { description: 'Helper text below the trigger.', control: 'text' },
    error: {
      description: 'Error message, or `true` for error styling without a message.',
      control: 'text',
    },
    explainer: {
      description: 'Explainer tooltip text next to the label.',
      control: 'text',
    },
    placeholder: {
      description: 'Trigger placeholder when nothing is selected.',
      control: 'text',
    },
    disabled: { description: 'Disables the whole field.', control: 'boolean' },
    optional: {
      description: 'Shows an “(optional)” suffix after the label.',
      control: 'boolean',
    },
    showLabel: { control: 'boolean' },
    showExplainer: { control: 'boolean' },
    showHelper: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesDatePickerV2>

const defaultArgs: Partial<DatePickerV2Props> = {
  label: 'Date',
  helper: 'Select a date',
  placeholder: 'Select a date',
  explainer: 'Additional information about this field',
  showLabel: true,
  showHelper: true,
  showExplainer: true,
}

export const Default: Story = (args) => ({
  components: { RcSesDatePickerV2 },
  setup() {
    const value = ref<string | null>(null)
    return { args, value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDatePickerV2 v-bind="args" v-model="value" />
    </div>
  `,
})
Default.args = defaultArgs

export const Selected: Story = () => ({
  components: { RcSesDatePickerV2 },
  setup() {
    const value = ref('2026-06-15')
    return { value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDatePickerV2
        v-model="value"
        label="Date"
        :show-explainer="false"
      />
    </div>
  `,
})

export const Range: Story = () => ({
  components: { RcSesDatePickerV2 },
  setup() {
    const value = ref<DatePickerV2RangeValue>(['2026-06-10', '2026-06-17'])
    return { value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesDatePickerV2
        v-model="value"
        label="Date range"
        range
        helper="Select a start and end date"
        :show-explainer="false"
      />
    </div>
  `,
})

export const States: Story = () => ({
  components: { RcSesDatePickerV2 },
  setup() {
    return {
      rest: ref(null),
      selected: ref('2026-06-15'),
      disabled: ref(null),
      error: ref(null),
    }
  },
  template: `
    <div style="display: grid; gap: 24px; max-width: 360px;">
      <RcSesDatePickerV2
        v-model="rest"
        label="Rest"
        placeholder="Select a date"
        :show-explainer="false"
      />
      <RcSesDatePickerV2
        v-model="selected"
        label="Selected"
        :show-explainer="false"
      />
      <RcSesDatePickerV2
        v-model="disabled"
        label="Disabled"
        disabled
        :show-explainer="false"
      />
      <RcSesDatePickerV2
        v-model="error"
        label="Error"
        error="Select a date"
        :show-explainer="false"
      />
    </div>
  `,
})
