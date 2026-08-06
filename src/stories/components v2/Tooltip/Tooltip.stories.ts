import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesTooltipV2 from '@/components/common/TooltipV2/RcSesTooltipV2.vue'
import type { TooltipV2Props } from '@/components/common/TooltipV2/types'

const meta: Meta<typeof RcSesTooltipV2> = {
  title: 'componentsV2/Tooltip',
  component: RcSesTooltipV2,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    openOnHover: { control: 'boolean' },
    openOnFocus: { control: 'boolean' },
    openOnClick: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesTooltipV2>

const sampleText =
  'If the owner is registered without a personal code, enter their date of birth.'

export const Default: Story = (args) => ({
  components: { RcSesTooltipV2 },
  setup() {
    return { args }
  },
  template: `
    <div style="padding: 80px; display: flex; align-items: center; gap: 8px;">
      <span style="font: 500 14px/20px 'Public Sans', sans-serif; color: #1F2733;">
        Owner personal code
      </span>
      <RcSesTooltipV2 v-bind="args" />
    </div>
  `,
})
Default.args = {
  text: sampleText,
  placement: 'top',
} satisfies Partial<TooltipV2Props>

export const Placements: Story = () => ({
  components: { RcSesTooltipV2 },
  setup() {
    return { text: sampleText }
  },
  template: `
    <div style="display: grid; gap: 96px; justify-items: center; padding: 96px;">
      <RcSesTooltipV2 :text="text" placement="top" open-on-click />
      <div style="display: flex; gap: 120px;">
        <RcSesTooltipV2 :text="text" placement="left" open-on-click />
        <RcSesTooltipV2 :text="text" placement="right" open-on-click />
      </div>
      <RcSesTooltipV2 :text="text" placement="bottom" open-on-click />
    </div>
  `,
})
