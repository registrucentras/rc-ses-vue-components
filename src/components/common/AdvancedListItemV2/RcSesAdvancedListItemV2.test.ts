import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import RcSesAdvancedListV2 from '@/components/common/AdvancedListV2/RcSesAdvancedListV2.vue'

import RcSesAdvancedListItemV2 from './RcSesAdvancedListItemV2.vue'

describe('RcSesAdvancedListItemV2', () => {
  const renderItem = (
    props: Record<string, unknown> = {},
    slots: Record<string, string> = {},
  ) =>
    render(RcSesAdvancedListItemV2, {
      props: {
        title: 'Jonas Jonaitis',
        ...props,
      },
      slots,
    })

  it('renders title and subtitle', () => {
    renderItem({ subtitle: 'a.k. 3850********', showSubtitle: true })

    expect(screen.getByText('Jonas Jonaitis')).toHaveClass(
      'rc-ses-advanced-list-item-v2__title',
    )
    expect(screen.getByText('a.k. 3850********')).toHaveClass(
      'rc-ses-advanced-list-item-v2__subtitle',
    )
  })

  it('hides subtitle when showSubtitle is false', () => {
    renderItem({ subtitle: 'Hidden', showSubtitle: false })

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('applies card container class by default', () => {
    const { container } = renderItem()

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--card',
    )
  })

  it('applies row container class', () => {
    const { container } = renderItem({ container: 'row' })

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--row',
    )
  })

  it('applies selected, disabled and error modifiers', () => {
    const { container } = renderItem({
      selected: true,
      disabled: true,
      error: true,
    })

    const item = container.querySelector('.rc-ses-advanced-list-item-v2')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--selected')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--disabled')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--error')
  })

  it('does not set option role when selectable outside a listbox', () => {
    const { container } = renderItem({ selectable: true, selected: true })

    expect(screen.queryByRole('option')).not.toBeInTheDocument()
    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveAttribute(
      'tabindex',
      '0',
    )
    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).not.toHaveAttribute(
      'aria-selected',
    )
  })

  it('sets option semantics when selectable inside a listbox', () => {
    render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 listbox accessible-label="Options">
          <RcSesAdvancedListItemV2 title="Jonas Jonaitis" selectable selected />
        </RcSesAdvancedListV2>
      `,
    })

    const option = screen.getByRole('option')
    expect(option).toHaveAttribute('aria-selected', 'true')
    expect(option).toHaveAttribute('tabindex', '0')
  })

  it('emits select when selectable item is clicked', async () => {
    const { emitted, container } = renderItem({ selectable: true })

    await fireEvent.click(container.querySelector('.rc-ses-advanced-list-item-v2')!)

    expect(emitted().select).toHaveLength(1)
  })

  it('does not emit select when disabled', async () => {
    const { emitted, container } = renderItem({ selectable: true, disabled: true })

    await fireEvent.click(container.querySelector('.rc-ses-advanced-list-item-v2')!)

    expect(emitted().select).toBeUndefined()
  })

  it('does not emit select from trailing actions', async () => {
    const { emitted } = renderItem(
      { selectable: true, showTrailing: true },
      { trailing: '<button type="button">Pašalinti</button>' },
    )

    await fireEvent.click(screen.getByRole('button', { name: 'Pašalinti' }))

    expect(emitted().select).toBeUndefined()
  })

  it('does not emit select from trailing keydown Enter/Space', async () => {
    const { emitted } = renderItem(
      { selectable: true, showTrailing: true },
      { trailing: '<button type="button">Pašalinti</button>' },
    )

    const button = screen.getByRole('button', { name: 'Pašalinti' })

    await fireEvent.keyDown(button, { key: 'Enter' })
    await fireEvent.keyDown(button, { key: ' ' })

    expect(emitted().select).toBeUndefined()
  })

  it('emits select via keyboard Enter on the item itself', async () => {
    const { emitted, container } = renderItem({ selectable: true })
    const item = container.querySelector('.rc-ses-advanced-list-item-v2')!

    await fireEvent.keyDown(item, { key: 'Enter' })

    expect(emitted().select).toHaveLength(1)
  })

  it('renders leading, trailing, meta, badge and expanded slots', () => {
    renderItem(
      {
        showLeading: true,
        showTrailing: true,
        showMeta: true,
        showBadge: true,
        showExpanded: true,
        showLeadingMedia: true,
      },
      {
        leading: '<span data-testid="leading">L</span>',
        'leading-media': '<span data-testid="leading-media">M</span>',
        trailing: '<span data-testid="trailing">T</span>',
        meta: '<span data-testid="meta">Meta</span>',
        badge: '<span data-testid="badge">Badge</span>',
        expanded: '<span data-testid="expanded">More</span>',
      },
    )

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('leading-media')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
    expect(screen.getByTestId('meta')).toBeInTheDocument()
    expect(screen.getByTestId('badge')).toBeInTheDocument()
    expect(screen.getByTestId('expanded')).toBeInTheDocument()
  })

  it('hides leading when showLeading is false', () => {
    renderItem(
      { showLeading: false },
      { leading: '<span data-testid="leading">L</span>' },
    )

    expect(screen.queryByTestId('leading')).not.toBeInTheDocument()
  })

  it('does not render leading-media when showLeadingMedia is false by default', () => {
    renderItem({}, { 'leading-media': '<span data-testid="leading-media">M</span>' })

    expect(screen.queryByTestId('leading-media')).not.toBeInTheDocument()
  })

  it('does not render meta, badge or expanded when show flags are false by default', () => {
    renderItem(
      {},
      {
        meta: '<span data-testid="meta">Meta</span>',
        badge: '<span data-testid="badge">Badge</span>',
        expanded: '<span data-testid="expanded">More</span>',
      },
    )

    expect(screen.queryByTestId('meta')).not.toBeInTheDocument()
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument()
    expect(screen.queryByTestId('expanded')).not.toBeInTheDocument()
  })

  it('applies nesting level via CSS variable', () => {
    const { container } = renderItem({ level: 2 })

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveStyle({
      '--rc-ses-list-item-level': '2',
    })
  })

  it('applies wrap-auto class by default', () => {
    const { container } = renderItem()

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--wrap-auto',
    )
  })

  it('applies wrap-off class', () => {
    const { container } = renderItem({ wrap: 'off' })

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--wrap-off',
    )
  })

  it('applies wrap-stacked class with start and trailing regions', () => {
    const { container } = renderItem(
      { wrap: 'stacked' },
      {
        leading: '<span data-testid="leading">L</span>',
        trailing: '<button type="button">Pašalinti</button>',
      },
    )

    const item = container.querySelector('.rc-ses-advanced-list-item-v2')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--wrap-stacked')
    expect(container.querySelector('.rc-ses-advanced-list-item-v2__start')).toBeTruthy()
    expect(
      container.querySelector('.rc-ses-advanced-list-item-v2__trailing'),
    ).toBeTruthy()
    expect(item).not.toHaveClass('rc-ses-advanced-list-item-v2--no-start')
    expect(item).not.toHaveClass('rc-ses-advanced-list-item-v2--no-trailing')
  })

  it('marks stacked item without trailing', () => {
    const { container } = renderItem(
      { wrap: 'stacked', showTrailing: false },
      { leading: '<span>L</span>' },
    )

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--no-trailing',
    )
  })

  it('shows leading and trailing after slots are added on a later render', async () => {
    render({
      components: { RcSesAdvancedListItemV2 },
      setup() {
        const hasActions = ref(false)
        return { hasActions }
      },
      template: `
        <div>
          <RcSesAdvancedListItemV2 title="Item" :show-leading="true" :show-trailing="true">
            <template v-if="hasActions" #leading>
              <span data-testid="leading">L</span>
            </template>
            <template v-if="hasActions" #trailing>
              <span data-testid="trailing">T</span>
            </template>
          </RcSesAdvancedListItemV2>
          <button type="button" @click="hasActions = true">Show actions</button>
        </div>
      `,
    })

    const item = document.querySelector('.rc-ses-advanced-list-item-v2')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--no-start')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--no-trailing')
    expect(screen.queryByTestId('leading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('trailing')).not.toBeInTheDocument()

    await fireEvent.click(screen.getByRole('button', { name: 'Show actions' }))

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
    expect(document.querySelector('.rc-ses-advanced-list-item-v2__start')).toBeTruthy()
    expect(document.querySelector('.rc-ses-advanced-list-item-v2__trailing')).toBeTruthy()
    expect(item).not.toHaveClass('rc-ses-advanced-list-item-v2--no-start')
    expect(item).not.toHaveClass('rc-ses-advanced-list-item-v2--no-trailing')
  })
})
