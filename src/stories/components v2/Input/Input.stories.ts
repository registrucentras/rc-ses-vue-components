import type { Meta, StoryFn } from '@storybook/vue3'
import { computed, ref } from 'vue'

import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'
import type { InputV2Props } from '@/components/common/inputs/InputV2/types'

const meta: Meta<typeof RcSesInputV2> = {
  title: 'componentsV2/Input',
  component: RcSesInputV2,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password'],
    },
    label: { control: 'text' },
    helper: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    optional: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showHelper: { control: 'boolean' },
    showExplainer: { control: 'boolean' },
    showLeading: { control: 'boolean' },
    showTrailing: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesInputV2>

const defaultArgs: Partial<InputV2Props> = {
  label: 'Label',
  helper: 'Helper text',
  placeholder: 'Placeholder',
  explainer: 'Additional information about this field',
  showLabel: true,
  showHelper: true,
  showExplainer: true,
}

export const Default: Story = (args) => ({
  components: { RcSesInputV2 },
  setup() {
    const value = ref('')
    return { args, value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesInputV2 v-bind="args" v-model="value" />
    </div>
  `,
})
Default.args = defaultArgs

export const States: Story = () => ({
  components: { RcSesInputV2 },
  setup() {
    return {
      rest: ref(''),
      filled: ref('Filled value'),
      disabled: ref(''),
      error: ref(''),
      loading: ref(''),
    }
  },
  template: `
    <div style="display: grid; gap: 24px; max-width: 360px;">
      <RcSesInputV2
        v-model="rest"
        label="Rest"
        helper="Helper text"
        placeholder="Placeholder"
        explainer="Short explanation of this field"
      />
      <RcSesInputV2
        v-model="filled"
        label="Filled"
        helper="Helper text"
        :show-explainer="false"
      />
      <RcSesInputV2
        v-model="disabled"
        label="Disabled"
        helper="Helper text"
        disabled
        :show-explainer="false"
      />
      <RcSesInputV2
        v-model="error"
        label="Error"
        error="Enter a value"
        placeholder="Placeholder"
        :show-explainer="false"
      />
      <RcSesInputV2
        v-model="loading"
        label="Loading"
        helper="Helper text"
        loading
        :show-explainer="false"
      />
    </div>
  `,
})

export const Optional: Story = () => ({
  components: { RcSesInputV2 },
  setup() {
    const value = ref('')
    return { value }
  },
  template: `
    <div style="max-width: 360px;">
      <RcSesInputV2
        v-model="value"
        label="Secondary email"
        optional
        placeholder="Placeholder"
        :show-explainer="false"
      />
    </div>
  `,
})

export const Presets: Story = () => ({
  components: { RcSesInputV2 },
  setup() {
    const name = ref('Jonas Jonaitis')
    const search = ref('')
    const password = ref('password1')
    const phone = ref('600 00000')
    const amount = ref('12,00')
    const passwordVisible = ref(false)

    const passwordType = computed(() => (passwordVisible.value ? 'text' : 'password'))
    const passwordEyeIcon = computed(() => (passwordVisible.value ? '$eyeSlash' : '$eye'))

    const togglePassword = () => {
      passwordVisible.value = !passwordVisible.value
    }

    return {
      name,
      search,
      password,
      phone,
      amount,
      passwordType,
      passwordEyeIcon,
      togglePassword,
    }
  },
  template: `
    <div style="display: grid; gap: 32px; max-width: 360px;">
      <RcSesInputV2
        v-model="name"
        label="Full name"
        helper="As stated in the documents"
        :show-explainer="false"
      />

      <RcSesInputV2
        v-model="search"
        label="Search"
        placeholder="Search for services"
        clearable
        :show-explainer="false"
        :show-helper="false"
      >
        <template #leading>
          <v-icon icon="$search" aria-hidden="true" />
        </template>
      </RcSesInputV2>

      <RcSesInputV2
        v-model="password"
        :type="passwordType"
        label="Password"
        helper="At least 8 characters"
        :show-explainer="false"
      >
        <template #trailing>
          <button
            type="button"
            aria-label="Toggle password visibility"
            style="appearance: none; background: transparent; border: 0; color: inherit; cursor: pointer; display: inline-flex; line-height: 0; padding: 0;"
            @click="togglePassword"
          >
            <v-icon :icon="passwordEyeIcon" aria-hidden="true" />
          </button>
        </template>
      </RcSesInputV2>

      <RcSesInputV2
        v-model="phone"
        label="Phone"
        :show-explainer="false"
        :show-helper="false"
      >
        <template #leading>
          <span class="rc-ses-input-v2__prefix">+370</span>
        </template>
      </RcSesInputV2>

      <RcSesInputV2
        v-model="amount"
        label="Amount"
        :show-explainer="false"
        :show-helper="false"
      >
        <template #trailing>
          <span class="rc-ses-input-v2__unit">€</span>
        </template>
      </RcSesInputV2>
    </div>
  `,
})
