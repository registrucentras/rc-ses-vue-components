// SearchField.stories.ts
import { Meta, StoryFn } from '@storybook/vue3'

import SearchField from '@/components/common/inputs/SearchField.vue'
import type { SearchFieldProps } from '@/types/inputs/SearchFieldProps'

const meta = {
  title: 'components/common/inputs/SearchField',
  component: SearchField,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean', type: 'boolean' },
    error: { control: 'text' },
    type: { control: 'text' },
  },
} satisfies Meta<SearchFieldProps>

export default meta

const Template: StoryFn<SearchFieldProps> = (args) => ({
  components: { SearchField },
  setup() {
    const modelMain = ref(undefined)
    const modelError = ref('')
    const modelReadOnly = ref('Negalima redaguoti')
    const modelDisabled = ref('Neaktyvus laukas')

    return { args, modelReadOnly, modelDisabled, modelMain, modelError }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <SearchField v-bind="args" v-model="modelMain"></SearchField>
      </div>
      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">State previews</div>
        <SearchField class="form-control" label="Read-only" readonly v-model="modelReadOnly"></SearchField>
        <SearchField class="form-control" label="Disabled" disabled v-model="modelDisabled"></SearchField>
        <SearchField label="Error" error="Klaidos pranešimas" v-model="modelError"></SearchField>
      </div>
    </div>
  `,
})

export const Main = Template.bind({})
Main.args = {
  label: 'Paieška',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  name: 'antraste',
  disabled: false,
  error: undefined,
  type: 'text',
  placeholder: 'Ieškoti',
}
