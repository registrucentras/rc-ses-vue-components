import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesTooltipV2 from './RcSesTooltipV2.vue'

const VTooltipStub = {
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    contentClass: { type: [String, Array, Object], default: undefined },
    location: { type: String, default: 'top' },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="rc-ses-tooltip-v2" v-bind="$attrs" :data-placement="location">
      <slot
        name="activator"
        :props="{
          onClick: () => $emit('update:modelValue', true),
          onFocus: () => $emit('update:modelValue', true),
          onMouseenter: () => $emit('update:modelValue', true),
        }"
      />
      <div
        v-if="modelValue"
        :class="contentClass"
        data-testid="tooltip-overlay"
      >
        <slot />
      </div>
    </div>
  `,
}

const VIconStub = {
  props: ['icon'],
  template: '<span class="v-icon" :data-icon="icon" />',
}

const vuetify = createVuetify()
const { i18next } = initI18n()

const renderTooltip = (props: Record<string, unknown> = {}, slots = {}) =>
  render(RcSesTooltipV2, {
    props: {
      text: 'Papildoma informacija apie lauką',
      ...props,
    },
    slots,
    global: {
      plugins: [[I18NextVue, { i18next }], vuetify],
      stubs: {
        VTooltip: VTooltipStub,
        VIcon: VIconStub,
      },
    },
  })

describe('RcSesTooltipV2', () => {
  it('renders default activator without v-btn bubble', () => {
    const { container } = renderTooltip()

    expect(container.querySelector('.rc-ses-tooltip-v2__activator')).toBeInTheDocument()
    expect(container.querySelector('.v-btn')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAccessibleName(/papildoma informacija/i)
  })

  it('shows text panel on activator interaction', async () => {
    renderTooltip({ text: 'Jei savininkas nurodytas be asmens kodo' })

    await fireEvent.click(screen.getByRole('button'))

    expect(screen.getByTestId('tooltip-overlay')).toBeInTheDocument()
    expect(
      screen.getByText('Jei savininkas nurodytas be asmens kodo'),
    ).toBeInTheDocument()
  })

  it('supports title + description alias', async () => {
    renderTooltip({
      text: undefined,
      title: 'Antraštė',
      description: 'Aprašymas',
    })

    await fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText('Antraštė')).toHaveClass('rc-ses-tooltip-v2__title')
    expect(screen.getByText('Aprašymas')).toBeInTheDocument()
  })

  it('applies placement content class', async () => {
    renderTooltip({ placement: 'bottom' })

    await fireEvent.click(screen.getByRole('button'))

    expect(screen.getByTestId('tooltip-overlay')).toHaveClass(
      'rc-ses-tooltip-v2__overlay--bottom',
    )
  })

  it('renders custom activator slot content', () => {
    renderTooltip(
      {},
      {
        activator: '<span data-testid="custom-activator">?</span>',
      },
    )

    expect(screen.getByTestId('custom-activator')).toBeInTheDocument()
  })
})
