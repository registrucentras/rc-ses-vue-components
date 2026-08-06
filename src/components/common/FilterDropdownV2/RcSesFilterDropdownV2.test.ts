import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesFilterDropdownV2 from './RcSesFilterDropdownV2.vue'
import type { FilterDropdownOption } from './types'

const options: FilterDropdownOption[] = [
  { value: 'vilnius', title: 'Vilnius' },
  { value: 'kaunas', title: 'Kaunas' },
  { value: 'klaipeda', title: 'Klaipėda' },
]

const VMenuStub = {
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  template: `
    <div>
      <slot
        name="activator"
        :props="{
          onClick: () => {
            if (!disabled) $emit('update:modelValue', true)
          },
        }"
      />
      <slot v-if="modelValue" />
    </div>
  `,
}

const RcSesBadgeV2Stub = {
  template: '<span data-testid="badge"><slot /></span>',
}

const RcSesCheckboxV2Stub = {
  props: ['modelValue', 'disabled', 'accessibleLabel'],
  emits: ['update:modelValue'],
  template: `
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="accessibleLabel"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  `,
}

const { i18next } = initI18n()
const vuetify = createVuetify()

const renderDropdown = (props: Record<string, unknown> = {}) =>
  render(RcSesFilterDropdownV2, {
    props: {
      label: 'Miestas',
      options,
      modelValue: [],
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }], vuetify],
      stubs: {
        RcSesBadgeV2: RcSesBadgeV2Stub,
        RcSesCheckboxV2: RcSesCheckboxV2Stub,
        'v-menu': VMenuStub,
        'v-icon': true,
      },
    },
  })

describe('RcSesFilterDropdownV2', () => {
  it('renders the filter label on the trigger', () => {
    renderDropdown()

    expect(screen.getByRole('button', { name: 'Miestas' })).toBeInTheDocument()
  })

  it('shows a brand badge when there are selections', () => {
    renderDropdown({ modelValue: ['vilnius', 'kaunas'] })

    expect(screen.getByTestId('badge')).toHaveTextContent('2')
  })

  it('includes selection count in the trigger accessible name', () => {
    renderDropdown({ modelValue: ['vilnius', 'kaunas'] })

    expect(
      screen.getByRole('button', { name: /Miestas, Pasirinkta: 2/i }),
    ).toBeInTheDocument()
  })

  it('toggles an option into the model', async () => {
    const { emitted } = renderDropdown()

    await fireEvent.click(screen.getByRole('button', { name: 'Miestas' }))
    await fireEvent.click(screen.getByRole('option', { name: /Vilnius/i }))

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([['vilnius']])
  })

  it('does not open when disabled', () => {
    renderDropdown({ disabled: true })

    expect(screen.getByRole('button', { name: 'Miestas' })).toBeDisabled()
  })
})
