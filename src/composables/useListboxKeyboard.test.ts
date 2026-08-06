import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import { useListboxKeyboard } from './useListboxKeyboard'

describe('useListboxKeyboard', () => {
  const setup = (
    optionCount: number | (() => number) = 3,
    disabledIndexes: number[] = [],
    extras: {
      getDefaultOpenIndex?: () => number
      onOpen?: () => void
    } = {},
  ) => {
    const open = ref(false)
    const activeIndex = ref(-1)
    const activated: number[] = []
    const getCount = typeof optionCount === 'function' ? optionCount : () => optionCount

    const api = useListboxKeyboard({
      open,
      activeIndex,
      getOptionCount: getCount,
      isOptionDisabled: (index) => disabledIndexes.includes(index),
      getOptionDomId: (index) => `option-${index}`,
      onActivate: (index) => {
        activated.push(index)
      },
      getDefaultOpenIndex: extras.getDefaultOpenIndex ?? (() => 0),
      onOpen: extras.onOpen,
    })

    vi.spyOn(document, 'getElementById').mockImplementation(
      (id) =>
        ({
          id,
          focus: vi.fn(),
        }) as unknown as HTMLElement,
    )

    return { open, activeIndex, activated, ...api }
  }

  it('ArrowUp on a closed trigger focuses the last option', async () => {
    const { open, activeIndex, onTriggerKeydown } = setup(4)

    onTriggerKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }))
    await nextTick()
    await nextTick()

    expect(open.value).toBe(true)
    expect(activeIndex.value).toBe(3)
  })

  it('ArrowDown on a closed trigger focuses the first option', async () => {
    const { open, activeIndex, onTriggerKeydown } = setup(4)

    onTriggerKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }))
    await nextTick()
    await nextTick()

    expect(open.value).toBe(true)
    expect(activeIndex.value).toBe(0)
  })

  it('Home / End on an open panel move to first / last enabled option', async () => {
    const { open, activeIndex, onPanelKeydown } = setup(4, [0, 3])
    open.value = true
    await nextTick()
    activeIndex.value = 1

    onPanelKeydown(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }))
    await nextTick()
    expect(activeIndex.value).toBe(1)

    onPanelKeydown(new KeyboardEvent('keydown', { key: 'End', cancelable: true }))
    await nextTick()
    expect(activeIndex.value).toBe(2)
  })

  it('Enter activates the active option when open', async () => {
    const { open, activeIndex, activated, onTriggerKeydown } = setup(3)
    open.value = true
    await nextTick()
    activeIndex.value = 2

    onTriggerKeydown(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }))

    expect(activated).toEqual([2])
  })

  it('calls onOpen before resolving the default open index', async () => {
    let optionCount = 1
    const onOpen = vi.fn(() => {
      optionCount = 3
    })
    const getDefaultOpenIndex = vi.fn(() => (optionCount > 1 ? 1 : 0))

    const { open, activeIndex } = setup(() => optionCount, [], {
      onOpen,
      getDefaultOpenIndex,
    })

    open.value = true
    await nextTick()

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(getDefaultOpenIndex).toHaveBeenCalled()
    expect(activeIndex.value).toBe(1)
  })

  it('calls onOpen before ArrowUp reads the last-option index', async () => {
    let optionCount = 1
    const onOpen = vi.fn(() => {
      optionCount = 4
    })

    const { open, activeIndex, onTriggerKeydown } = setup(() => optionCount, [], {
      onOpen,
    })

    onTriggerKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }))
    await nextTick()
    await nextTick()

    expect(onOpen).toHaveBeenCalled()
    expect(open.value).toBe(true)
    expect(activeIndex.value).toBe(3)
  })
})
