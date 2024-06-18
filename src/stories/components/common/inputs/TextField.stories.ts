// TextField.stories.ts
import { Meta, StoryFn } from '@storybook/vue3'

import TextField from '@/components/common/inputs/TextField/Textfield.vue'
import { TextFieldProps } from '@/types/inputs/TextFieldProps'

export default {
  title: 'components/common/inputs/TextField',
  component: TextField,

  tags: ['autodocs'],
} as Meta

const Template: StoryFn<TextFieldProps> = (args) => ({
  components: { TextField },
  setup() {
    const modelReadOnly = ref('Negalima redaguoti')
    const modelDisabled = ref('Neaktyvus laukas')

    return { args, modelReadOnly, modelDisabled }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <TextField v-bind="args"></TextField>
      </div>
      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">State previews</div>
        <TextField class="form-control" label="Read-only" readonly v-model="modelReadOnly"></TextField>
        <TextField class="form-control" label="Disabled" disabled v-model="modelDisabled"></TextField>
        <TextField label="Error" error="Klaidos pranešimas"></TextField>
      </div>
    </div>
  `,
})

export const Main = Template.bind({})
Main.args = {
  label: 'Antraštė',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  name: 'antraste',
}