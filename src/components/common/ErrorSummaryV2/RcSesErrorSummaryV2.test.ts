import { fireEvent, render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import I18NextVue from 'i18next-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesErrorSummaryV2 from './RcSesErrorSummaryV2.vue'
import type { ErrorSummaryProps } from './types'

const { i18next } = initI18n()

const globalMountOptions = {
  plugins: [[I18NextVue, { i18next }]],
  stubs: {
    'v-icon': true,
  },
}

const renderSummary = (props: Partial<ErrorSummaryProps> = {}) =>
  render(RcSesErrorSummaryV2, {
    props: {
      autofocus: false,
      ...props,
    },
    global: globalMountOptions,
  })

const mountSummary = (props: Partial<ErrorSummaryProps> = {}) =>
  mount(RcSesErrorSummaryV2, {
    props: {
      autofocus: false,
      ...props,
    },
    attachTo: document.body,
    global: globalMountOptions,
  })

describe('RcSesErrorSummaryV2', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders nothing when there are no errors', () => {
    const { container } = renderSummary({ errors: [] })

    expect(container.querySelector('.rc-ses-error-summary-v2')).not.toBeInTheDocument()
  })

  it('renders the default title and error messages', () => {
    const { container } = renderSummary({
      errors: [
        { message: 'Vardas, pavardė — privaloma', fieldId: 'fullName' },
        'Serverio klaida — bandykite dar kartą',
      ],
    })

    expect(container.querySelector('.rc-ses-error-summary-v2')).toBeInTheDocument()
    expect(container.querySelector('.rc-ses-error-summary-v2')).toHaveAttribute(
      'aria-labelledby',
    )
    expect(
      screen.getByRole('heading', { name: 'Pataisykite šias klaidas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Vardas, pavardė — privaloma' }),
    ).toHaveAttribute('href', '#fullName')
    expect(screen.getByText('Serverio klaida — bandykite dar kartą')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Serverio klaida — bandykite dar kartą' }),
    ).not.toBeInTheDocument()
  })

  it('accepts plain string errors without field links', () => {
    renderSummary({
      errors: ['Bendroji klaida'],
    })

    expect(screen.getByText('Bendroji klaida')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('uses a custom title when provided', () => {
    renderSummary({
      title: 'Yra klaidų',
      errors: ['Klaida'],
    })

    expect(screen.getByRole('heading', { name: 'Yra klaidų' })).toBeInTheDocument()
  })

  it('drops empty and whitespace-only messages', () => {
    renderSummary({
      errors: ['', '   ', { message: '   ' }, { message: 'Validi klaida' }],
    })

    expect(screen.getByText('Validi klaida')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('trims fieldId and treats blank fieldId as plain text', () => {
    renderSummary({
      errors: [
        { message: 'El. paštas — neteisingas', fieldId: '  email  ' },
        { message: 'Bendroji klaida', fieldId: '   ' },
      ],
    })

    expect(
      screen.getByRole('link', { name: 'El. paštas — neteisingas' }),
    ).toHaveAttribute('href', '#email')
    expect(screen.getByText('Bendroji klaida')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Bendroji klaida' }),
    ).not.toBeInTheDocument()
  })

  it('focuses the linked field when an error link is clicked', async () => {
    const field = document.createElement('input')
    field.id = 'email'
    field.scrollIntoView = vi.fn()
    document.body.appendChild(field)
    const focusSpy = vi.spyOn(field, 'focus')

    renderSummary({
      errors: [{ message: 'El. paštas — neteisingo formato', fieldId: 'email' }],
    })

    await fireEvent.click(
      screen.getByRole('link', { name: 'El. paštas — neteisingo formato' }),
    )
    await nextTick()

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    expect(field.scrollIntoView).toHaveBeenCalledWith({
      block: 'center',
      behavior: 'smooth',
    })
  })

  it('prevents hash navigation when the target field is missing', async () => {
    renderSummary({
      errors: [{ message: 'Trūkstamas laukas', fieldId: 'missing-field' }],
    })

    const link = screen.getByRole('link', { name: 'Trūkstamas laukas' })
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    link.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  it('exposes focus() that moves keyboard focus onto the summary', async () => {
    const wrapper = mountSummary({
      errors: ['Klaida'],
    })

    const summary = wrapper.find('.rc-ses-error-summary-v2').element as HTMLElement
    const focusSpy = vi.spyOn(summary, 'focus')

    expect(summary).toHaveAttribute('tabindex', '-1')
    await wrapper.vm.focus()

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('focuses the summary when errors appear and autofocus is true', async () => {
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus')
    const wrapper = mountSummary({
      autofocus: true,
      errors: [],
    })

    expect(wrapper.find('.rc-ses-error-summary-v2').exists()).toBe(false)
    focusSpy.mockClear()

    await wrapper.setProps({
      errors: ['Pirma klaida'],
    })
    await nextTick()
    await nextTick()

    expect(wrapper.find('.rc-ses-error-summary-v2').exists()).toBe(true)
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    focusSpy.mockRestore()
  })

  it('does not steal focus when autofocus is false', async () => {
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus')
    const wrapper = mountSummary({
      autofocus: false,
      errors: [],
    })
    focusSpy.mockClear()

    await wrapper.setProps({
      errors: ['Pirma klaida'],
    })
    await nextTick()
    await nextTick()

    expect(focusSpy).not.toHaveBeenCalledWith({ preventScroll: true })
    focusSpy.mockRestore()
  })

  it('does not re-focus when errors change while already visible', async () => {
    const wrapper = mountSummary({
      autofocus: true,
      errors: ['Pirma klaida'],
    })
    await nextTick()
    await nextTick()

    const summary = wrapper.find('.rc-ses-error-summary-v2').element as HTMLElement
    const focusSpy = vi.spyOn(summary, 'focus')
    focusSpy.mockClear()

    await wrapper.setProps({
      errors: ['Pirma klaida', 'Antra klaida'],
    })
    await nextTick()
    await nextTick()

    expect(focusSpy).not.toHaveBeenCalled()
  })
})
