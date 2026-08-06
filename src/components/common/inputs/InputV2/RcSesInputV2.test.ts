import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesInputV2 from './RcSesInputV2.vue'

const VTextFieldStub = {
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    id: { type: String, default: undefined },
    type: { type: String, default: 'text' },
  },
  emits: ['update:modelValue', 'update:focused', 'click:clear'],
  template: `
    <div class="v-text-field" v-bind="$attrs">
      <slot name="prepend-inner" />
      <input
        :id="id"
        class="v-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('update:focused', true)"
        @blur="$emit('update:focused', false)"
      />
      <button
        v-if="clearable && modelValue"
        type="button"
        class="v-field__clearable"
        aria-label="Išvalyti"
        @click="$emit('update:modelValue', ''); $emit('click:clear')"
      >
        <i class="v-icon" />
      </button>
      <slot name="append-inner" />
    </div>
  `,
}

const VIconStub = {
  props: ['icon'],
  template: '<span class="v-icon" :data-icon="icon" />',
}

const vuetify = createVuetify()
const { i18next } = initI18n()

const renderField = (
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) =>
  render(RcSesInputV2, {
    props: {
      label: 'Antraštė',
      showExplainer: false,
      ...props,
    },
    slots,
    global: {
      plugins: [[I18NextVue, { i18next }], vuetify],
      stubs: {
        VTextField: VTextFieldStub,
        VIcon: VIconStub,
        RcSesTooltipV2: { template: '<span class="tooltip-stub" />' },
        RcSesLoaderV2: {
          template: '<span class="rc-ses-loader-v2" role="status" />',
        },
      },
    },
  })

describe('RcSesInputV2', () => {
  it('renders label, helper and placeholder', () => {
    renderField({
      helper: 'Pagalbinis tekstas',
      placeholder: 'Tekstas',
      modelValue: '',
    })

    expect(screen.getByText('Antraštė')).toBeInTheDocument()
    expect(screen.getByText('Pagalbinis tekstas')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tekstas')).toBeInTheDocument()
  })

  it('shows optional suffix', () => {
    renderField({ optional: true, modelValue: '' })

    expect(screen.getByText(/neprivaloma/i)).toBeInTheDocument()
  })

  it('updates model on input', async () => {
    const { emitted } = renderField({
      modelValue: '',
      placeholder: 'Tekstas',
    })

    await fireEvent.update(screen.getByPlaceholderText('Tekstas'), 'Hello')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['Hello'])
  })

  it('applies error helper and field class', () => {
    const { container } = renderField({
      error: 'Įveskite reikšmę',
      modelValue: '',
    })

    expect(screen.getByText('Įveskite reikšmę')).toHaveClass(
      'rc-ses-input-v2__helper--error',
    )
    expect(container.querySelector('.rc-ses-input-v2__field')).toHaveClass(
      'rc-ses-input-v2__field--error',
    )
  })

  it('clears value when clearable', async () => {
    const { emitted } = renderField({
      modelValue: 'query',
      clearable: true,
    })

    const clearButton = screen.getByRole('button', { name: /išvalyti/i })
    await fireEvent.click(clearButton)

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([''])
    expect(emitted().clear).toBeTruthy()
  })

  it('shows loading spinner and locks input', () => {
    const { container } = renderField({
      loading: true,
      modelValue: '',
    })

    expect(container.querySelector('.rc-ses-loader-v2')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('disables the whole field stack', () => {
    const { container } = renderField({
      disabled: true,
      modelValue: '',
    })

    expect(container.querySelector('.rc-ses-input-v2')).toHaveClass(
      'rc-ses-input-v2--disabled',
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders leading and trailing slots', () => {
    renderField(
      { modelValue: '' },
      {
        leading: '<span data-testid="leading">L</span>',
        trailing: '<span data-testid="trailing">T</span>',
      },
    )

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
  })

  it('applies focused class on focus', async () => {
    const { container } = renderField({
      modelValue: '',
      placeholder: 'Tekstas',
    })

    await fireEvent.focus(screen.getByPlaceholderText('Tekstas'))

    expect(container.querySelector('.rc-ses-input-v2__field')).toHaveClass(
      'rc-ses-input-v2__field--focused',
    )
  })

  it('uses Vuetify text field under the hood', () => {
    const { container } = renderField({ modelValue: '' })

    expect(container.querySelector('.v-text-field')).toBeInTheDocument()
  })
})
