import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesDatePickerV2 from './RcSesDatePickerV2.vue'

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
    showLabel: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'focus', 'blur', 'keydown'],
  template: `
    <div class="rc-ses-input-v2-stub">
      <label v-if="showLabel && label">{{ label }}</label>
      <slot name="leading" />
      <input
        class="v-field__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"
      />
      <slot name="trailing" />
    </div>
  `,
}

const vuetify = createVuetify()
const { i18next } = initI18n()

const renderPicker = (
  props: Record<string, unknown> = {},
  modelValue: string | [string | null, string | null] | null = null,
) => {
  const model = ref(modelValue)

  const result = render(
    {
      components: { RcSesDatePickerV2 },
      setup() {
        return { model, props }
      },
      template: `<RcSesDatePickerV2 v-bind="props" v-model="model" />`,
    },
    {
      global: {
        plugins: [[I18NextVue, { i18next }], vuetify],
        stubs: {
          VMenu: VMenuStub,
          VIcon: VIconStub,
          RcSesInputV2: InputV2Stub,
          RcSesTooltipV2: { template: '<span class="tooltip-stub" />' },
        },
      },
    },
  )

  return { ...result, model }
}

const calendarButton = () =>
  screen.getByRole('button', { name: /open calendar|atidaryti kalendorių/i })

const openCalendar = async () => {
  await fireEvent.click(calendarButton())
}

describe('RcSesDatePickerV2', () => {
  it('renders trigger label and calendar icon', () => {
    renderPicker({
      label: 'Date',
      showExplainer: false,
    })

    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(document.querySelector('[data-icon="$calendar"]')).toBeTruthy()
  })

  it('opens calendar and selects a single date', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      null,
    )

    await openCalendar()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const day = screen.getByRole('gridcell', { name: /15/i })
    await fireEvent.click(day)

    expect(typeof model.value).toBe('string')
    expect(model.value).toMatch(/^\d{4}-\d{2}-15$/)
  })

  it('supports range selection', async () => {
    const { model } = renderPicker(
      {
        label: 'Date range',
        range: true,
        showExplainer: false,
      },
      [null, null],
    )

    await openCalendar()

    const days = screen.getAllByRole('gridcell')
    const enabled = days.filter((el) => !(el as HTMLButtonElement).disabled)
    expect(enabled[10]).toBeTruthy()
    expect(enabled[14]).toBeTruthy()
    await fireEvent.click(enabled[10]!)
    await fireEvent.click(enabled[14]!)

    expect(Array.isArray(model.value)).toBe(true)
    expect((model.value as string[])[0]).toBeTruthy()
    expect((model.value as string[])[1]).toBeTruthy()
  })

  it('does not open when disabled', async () => {
    renderPicker({
      label: 'Date',
      disabled: true,
      showExplainer: false,
    })

    await openCalendar()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('resumes incomplete range selection on reopen', async () => {
    renderPicker(
      {
        label: 'Date range',
        range: true,
        showExplainer: false,
      },
      ['2026-06-10', null],
    )

    await openCalendar()

    const startDay = screen
      .getAllByRole('gridcell')
      .find((el) => el.getAttribute('aria-selected') === 'true')

    expect(startDay).toBeTruthy()
    expect(startDay?.textContent).toBe('10')
    expect(startDay?.className).toContain('rc-ses-date-picker-v2__day--range-start')
  })

  it('accepts a manually typed single date on blur', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      null,
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    await fireEvent.update(input, '2026-08-20')
    await fireEvent.blur(input)

    expect(model.value).toBe('2026-08-20')
    expect((input as HTMLInputElement).value).toBe('2026-08-20')
  })

  it('reverts invalid typed date on blur', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      '2026-01-15',
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    expect((input as HTMLInputElement).value).toBe('2026-01-15')

    await fireEvent.update(input, 'not-a-date')
    await fireEvent.blur(input)

    expect(model.value).toBe('2026-01-15')
    expect((input as HTMLInputElement).value).toBe('2026-01-15')
  })

  it('rejects overflow calendar dates on blur', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      '2026-01-15',
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    await fireEvent.update(input, '2026-02-31')
    await fireEvent.blur(input)

    expect(model.value).toBe('2026-01-15')
    expect((input as HTMLInputElement).value).toBe('2026-01-15')
  })

  it('does not rewrite an end-only range on blur when nothing was typed', async () => {
    const { model } = renderPicker(
      {
        label: 'Date range',
        range: true,
        showExplainer: false,
      },
      [null, '2026-06-15'],
    )

    const input = screen.getByRole('textbox')
    expect((input as HTMLInputElement).value).toBe('2026-06-15')

    await fireEvent.focus(input)
    await fireEvent.blur(input)

    expect(model.value).toEqual([null, '2026-06-15'])
  })

  it('accepts a manually typed range on Enter', async () => {
    const { model } = renderPicker(
      {
        label: 'Date range',
        range: true,
        showExplainer: false,
      },
      [null, null],
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    await fireEvent.update(input, '2026-06-10 – 2026-06-15')
    await fireEvent.keyDown(input, { key: 'Enter' })

    expect(model.value).toEqual(['2026-06-10', '2026-06-15'])
  })

  it('clears the value when the input is emptied', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      '2026-03-01',
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    await fireEvent.update(input, '')
    await fireEvent.blur(input)

    expect(model.value).toBeNull()
  })

  it('opens calendar on typed year without requiring blur commit first', async () => {
    renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      '2026-06-10',
    )

    const input = screen.getByRole('textbox')
    const button = calendarButton()

    await fireEvent.focus(input)
    await fireEvent.update(input, '2015')
    await fireEvent.blur(input, { relatedTarget: button })
    await fireEvent.click(button)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.getAttribute('aria-label') ?? '').toMatch(/2015/)
    expect((input as HTMLInputElement).value).toBe('2015')
  })

  it('keeps calendar selection when typed text differs', async () => {
    const { model } = renderPicker(
      {
        label: 'Date',
        showExplainer: false,
      },
      null,
    )

    const input = screen.getByRole('textbox')
    await fireEvent.focus(input)
    await fireEvent.update(input, '2015-08-20')
    await fireEvent.keyDown(input, { key: 'ArrowDown' })

    expect(screen.getByRole('dialog').getAttribute('aria-label') ?? '').toMatch(/2015/)

    const day = screen.getByRole('gridcell', { name: /2015.*15|15.*2015/i })
    await fireEvent.click(day)

    expect(model.value).toBe('2015-08-15')
  })
})
