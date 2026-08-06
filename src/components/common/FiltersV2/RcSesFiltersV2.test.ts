import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesFiltersV2 from './RcSesFiltersV2.vue'
import type { FiltersFilter, FiltersModelValue } from './types'

const filters: FiltersFilter[] = [
  {
    id: 'city',
    label: 'Miestas',
    options: [
      { value: 'vilnius', title: 'Vilnius' },
      { value: 'kaunas', title: 'Kaunas' },
    ],
  },
  {
    id: 'status',
    label: 'Statusas',
    options: [
      { value: 'open', title: 'Atvira' },
      { value: 'closed', title: 'Uždaryta' },
    ],
  },
]

const widthRef = ref(1200)

vi.mock('vuetify', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vuetify')>()

  return {
    ...actual,
    useDisplay: () => ({
      width: widthRef,
    }),
  }
})

const RcSesInputV2Stub = {
  props: ['modelValue', 'placeholder', 'disabled'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      aria-label="search"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  `,
}

const RcSesFilterDropdownV2Stub = {
  props: ['label', 'modelValue', 'disabled'],
  emits: ['update:modelValue'],
  template: `
    <button
      type="button"
      :aria-label="label"
      :disabled="disabled"
      @click="$emit('update:modelValue', ['vilnius'])"
    >
      {{ label }}
    </button>
  `,
}

const RcSesBadgeV2Stub = {
  template: '<span data-testid="badge"><slot /></span>',
}

const RcSesButtonV2Stub = {
  emits: ['click'],
  template: '<button type="button" @click="$emit(\'click\')"><slot /></button>',
}

const RcSesCheckboxV2Stub = {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  template: `
    <label>
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      {{ label }}
    </label>
  `,
}

const { i18next } = initI18n()

const renderFilters = (
  props: Record<string, unknown> = {},
  modelValue?: FiltersModelValue,
) =>
  render(RcSesFiltersV2, {
    props: {
      filters,
      searchDebounceMs: 0,
      modelValue: modelValue ?? { search: '', selections: {} },
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        RcSesInputV2: RcSesInputV2Stub,
        RcSesFilterDropdownV2: RcSesFilterDropdownV2Stub,
        RcSesBadgeV2: RcSesBadgeV2Stub,
        RcSesButtonV2: RcSesButtonV2Stub,
        RcSesCheckboxV2: RcSesCheckboxV2Stub,
        'v-menu': {
          template: '<div><slot name="activator" :props="{}" /><slot /></div>',
        },
        'v-bottom-sheet': {
          props: ['modelValue'],
          template: '<div v-if="modelValue"><slot /></div>',
        },
        'v-icon': true,
      },
    },
  })

describe('RcSesFiltersV2', () => {
  beforeEach(() => {
    widthRef.value = 1200
  })

  it('renders desktop search and filter triggers', () => {
    renderFilters()

    expect(screen.getByLabelText('search')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Miestas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Statusas' })).toBeInTheDocument()
  })

  it('disables clear when no filters are active', () => {
    renderFilters()

    expect(screen.getByRole('button', { name: 'Išvalyti filtrus' })).toBeDisabled()
  })

  it('clears search and selections', async () => {
    const { emitted } = renderFilters(
      {},
      { search: 'abc', selections: { city: ['vilnius'] } },
    )

    await fireEvent.click(screen.getByRole('button', { name: 'Išvalyti filtrus' }))

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([
      { search: '', selections: {} },
    ])
  })

  it('updates a filter selection live on desktop', async () => {
    const { emitted } = renderFilters()

    await fireEvent.click(screen.getByRole('button', { name: 'Miestas' }))

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([
      { search: '', selections: { city: ['vilnius'] } },
    ])
  })

  it('uses mobile trigger and apply pattern below breakpoint', async () => {
    widthRef.value = 500
    const { emitted } = renderFilters()
    await nextTick()

    await fireEvent.click(screen.getByRole('button', { name: /Filtrai/i }))
    await fireEvent.click(screen.getByText('Vilnius'))
    await fireEvent.click(screen.getByRole('button', { name: /Taikyti/i }))

    expect(emitted()['update:modelValue']?.at(-1)?.[0]).toMatchObject({
      selections: { city: ['vilnius'] },
    })
  })
})
