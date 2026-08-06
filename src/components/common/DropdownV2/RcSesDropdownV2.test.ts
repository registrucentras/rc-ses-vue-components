import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesDropdownV2 from './RcSesDropdownV2.vue'

const VMenuStub = {
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="v-menu-stub">
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

const VIconStub = {
  props: ['icon'],
  template: '<span class="v-icon" :data-icon="icon" />',
}

const InputV2Stub = {
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="rc-ses-input-v2-stub">
      <label v-if="showLabel && label">{{ label }}</label>
      <slot name="leading" />
      <input
        class="v-field__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="trailing" />
    </div>
  `,
}

const vuetify = createVuetify()
const { i18next } = initI18n()

const sampleItems = [
  {
    value: 'transport',
    title: 'Transport',
    count: 12,
    items: [
      { value: 'regitra', title: 'VI Regitra' },
      { value: 'ltpost', title: 'Lithuanian Post' },
    ],
  },
  {
    value: 'finance',
    title: 'Finance',
    count: 8,
    items: [{ value: 'bank', title: 'Bank of Lithuania' }],
  },
]

const renderDropdown = (
  props: Record<string, unknown> = {},
  modelValue: string | string[] | null = null,
) => {
  const model = ref(modelValue)

  const result = render(
    {
      components: { RcSesDropdownV2 },
      setup() {
        return { model, props }
      },
      template: `
        <RcSesDropdownV2
          v-bind="props"
          v-model="model"
        />
      `,
    },
    {
      global: {
        plugins: [[I18NextVue, { i18next }], vuetify],
        stubs: {
          VMenu: VMenuStub,
          VIcon: VIconStub,
          RcSesInputV2: InputV2Stub,
          RcSesBadgeV2: {
            template: '<span class="rc-ses-badge-stub"><slot /></span>',
          },
          RcSesCheckboxV2: {
            props: ['modelValue', 'indeterminate', 'disabled', 'accessibleLabel'],
            template:
              '<button type="button" class="rc-ses-checkbox-v2-stub" :aria-checked="indeterminate ? \'mixed\' : modelValue" :aria-label="accessibleLabel" @click="$emit(\'update:modelValue\', !modelValue)" />',
          },
          RcSesTooltipV2: { template: '<span class="tooltip-stub" />' },
        },
      },
    },
  )

  return { ...result, model }
}

describe('RcSesDropdownV2', () => {
  it('renders trigger label and caret', () => {
    renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
    })

    expect(screen.getByText('Service provider')).toBeInTheDocument()
    expect(document.querySelector('[data-icon="$caretDown"]')).toBeTruthy()
  })

  it('opens panel and lists grouped options', async () => {
    renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
      showAllOption: true,
    })

    await fireEvent.click(screen.getByRole('combobox'))

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Visi')).toBeInTheDocument()
    expect(screen.getByText('Transport')).toBeInTheDocument()
    expect(screen.getByText('VI Regitra')).toBeInTheDocument()
  })

  it('selects a group and shows count in the trigger', async () => {
    const { model } = renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
      showAllOption: false,
    })

    await fireEvent.click(screen.getByRole('combobox'))
    await fireEvent.click(screen.getByText('Transport'))

    expect(model.value).toBe('transport')
    expect(screen.getByDisplayValue('Transport (12)')).toBeInTheDocument()
  })

  it('marks a selected group option as selected in single mode', async () => {
    const { container } = renderDropdown(
      {
        label: 'Service provider',
        showExplainer: false,
        items: sampleItems,
        showAllOption: false,
      },
      'transport',
    )

    await fireEvent.click(screen.getByRole('combobox'))

    const groupOption = container.querySelector('.rc-ses-dropdown-v2__option--group')
    expect(groupOption).toHaveClass('rc-ses-dropdown-v2__option--selected')
    expect(groupOption).toHaveAttribute('aria-selected', 'true')
  })

  it('selects a single value and closes', async () => {
    const { model } = renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
      showAllOption: false,
    })

    await fireEvent.click(screen.getByRole('combobox'))
    await fireEvent.click(screen.getByText('Transport'))

    expect(model.value).toBe('transport')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('multi group select stores leaf values only', async () => {
    const { model } = renderDropdown(
      {
        label: 'Service provider',
        showExplainer: false,
        items: sampleItems,
        multiple: true,
        showAllOption: false,
      },
      [],
    )

    await fireEvent.click(screen.getByRole('combobox'))
    await fireEvent.click(screen.getByText('Transport'))

    expect(model.value).toEqual(['regitra', 'ltpost'])
  })

  it('supports multi-select with checkboxes', async () => {
    const { model } = renderDropdown(
      {
        label: 'Service provider',
        showExplainer: false,
        items: sampleItems,
        multiple: true,
        footerText: 'Selected: 2 • 7 more groups',
      },
      [],
    )

    await fireEvent.click(screen.getByRole('combobox'))
    await fireEvent.click(screen.getByText('VI Regitra'))
    await fireEvent.click(screen.getByText('Bank of Lithuania'))

    expect(model.value).toEqual(['regitra', 'bank'])
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Selected: 2 • 7 more groups')).toBeInTheDocument()
  })

  it('filters options by search query', async () => {
    renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
    })

    await fireEvent.click(screen.getByRole('combobox'))

    const search = screen.getByPlaceholderText(/ieškoti/i)
    await fireEvent.update(search, 'Regitra')

    expect(screen.getByText('VI Regitra')).toBeInTheDocument()
    expect(screen.queryByText('Bank of Lithuania')).not.toBeInTheDocument()
  })

  it('does not open when disabled', async () => {
    renderDropdown({
      label: 'Service provider',
      showExplainer: false,
      items: sampleItems,
      disabled: true,
    })

    await fireEvent.click(screen.getByRole('combobox'))

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
