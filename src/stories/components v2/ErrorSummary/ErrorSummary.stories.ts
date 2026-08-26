import type { Meta, StoryFn } from '@storybook/vue3'
import { computed, ref } from 'vue'

import RcSesErrorSummaryV2 from '@/components/common/ErrorSummaryV2/RcSesErrorSummaryV2.vue'
import type { ErrorSummaryError } from '@/components/common/ErrorSummaryV2/types'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'

const defaultTitle = 'Fix these errors'

const sampleErrors: ErrorSummaryError[] = [
  { message: 'Full name — required', fieldId: 'fullName' },
  { message: 'Email — invalid format', fieldId: 'email' },
  { message: 'Consent — must be checked', fieldId: 'consent' },
]

const meta: Meta<typeof RcSesErrorSummaryV2> = {
  title: 'componentsV2/ErrorSummary',
  component: RcSesErrorSummaryV2,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading text. Pass via prop (not hardcoded in the component).',
    },
    autofocus: {
      control: 'boolean',
      description: 'Move focus to the summary when errors first appear.',
    },
    errors: {
      control: 'object',
      description:
        'Array of `{ message, fieldId? }` objects and/or plain strings (no field link).',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesErrorSummaryV2>

export const Default: Story = (args) => ({
  components: { RcSesErrorSummaryV2 },
  setup() {
    return { args }
  },
  template: `
    <div style="max-width: 520px;">
      <RcSesErrorSummaryV2 v-bind="args" />
    </div>
  `,
})
Default.args = {
  title: defaultTitle,
  autofocus: false,
  errors: sampleErrors,
}

export const MixedFieldAndText: Story = () => ({
  components: { RcSesErrorSummaryV2 },
  template: `
    <div style="max-width: 520px;">
      <RcSesErrorSummaryV2
        title="Fix these errors"
        :autofocus="false"
        :errors="[
          { message: 'Full name — required', fieldId: 'fullName' },
          'Something went wrong — please try again',
        ]"
      />
    </div>
  `,
})

export const FormExample: Story = () => ({
  components: {
    RcSesErrorSummaryV2,
    RcSesInputV2,
    RcSesCheckboxV2,
    RcSesButtonV2,
  },
  setup() {
    const fullName = ref('')
    const email = ref('')
    const consent = ref(false)
    const submitted = ref(false)
    const summaryRef = ref<{ focus: () => void } | null>(null)

    const fieldErrors = computed(() => {
      const next = {
        fullName: '',
        email: '',
        consent: '',
      }

      if (!submitted.value) {
        return next
      }

      if (!fullName.value.trim()) {
        next.fullName = 'Enter your full name'
      }

      if (!email.value.trim()) {
        next.email = 'Enter your email'
      } else if (!email.value.includes('@')) {
        next.email = 'Enter a valid email'
      }

      if (!consent.value) {
        next.consent = 'You must agree to continue'
      }

      return next
    })

    const errors = computed<ErrorSummaryError[]>(() => {
      if (!submitted.value) {
        return []
      }

      const next: ErrorSummaryError[] = []

      if (fieldErrors.value.fullName) {
        next.push({
          message: `Full name — ${fieldErrors.value.fullName}`,
          fieldId: 'story-fullName',
        })
      }

      if (fieldErrors.value.email) {
        next.push({
          message: `Email — ${fieldErrors.value.email}`,
          fieldId: 'story-email',
        })
      }

      if (fieldErrors.value.consent) {
        next.push({
          message: `Consent — ${fieldErrors.value.consent}`,
          fieldId: 'story-consent',
        })
      }

      return next
    })

    const onSubmit = () => {
      submitted.value = true

      if (errors.value.length > 0) {
        summaryRef.value?.focus()
      }
    }

    return {
      fullName,
      email,
      consent,
      fieldErrors,
      errors,
      summaryRef,
      onSubmit,
    }
  },
  template: `
    <div
      style="
        max-width: 520px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
        border: 1px solid #dce0e5;
        border-radius: 12px;
        background: #fff;
      "
    >
      <RcSesErrorSummaryV2
        ref="summaryRef"
        title="Fix these errors"
        :autofocus="true"
        :errors="errors"
      />

      <RcSesInputV2
        id="story-fullName"
        v-model="fullName"
        label="Full name"
        placeholder="Enter full name"
        :show-explainer="false"
        :error="fieldErrors.fullName || false"
      />

      <RcSesInputV2
        id="story-email"
        v-model="email"
        label="Email"
        placeholder="name@example.com"
        :show-explainer="false"
        :error="fieldErrors.email || false"
      />

      <div id="story-consent" tabindex="-1">
        <RcSesCheckboxV2
          v-model="consent"
          label="I agree to the terms of service"
          :error="fieldErrors.consent || false"
        />
      </div>

      <div>
        <RcSesButtonV2 type="button" variant="primary" @click="onSubmit">
          Continue
        </RcSesButtonV2>
      </div>
    </div>
  `,
})
