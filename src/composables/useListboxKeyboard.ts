import { type MaybeRefOrGetter, type Ref, nextTick, toValue, watch } from 'vue'

export type UseListboxKeyboardOptions = {
  open: Ref<boolean>
  activeIndex: Ref<number>
  disabled?: MaybeRefOrGetter<boolean>
  getOptionCount: () => number
  isOptionDisabled?: (index: number) => boolean
  getOptionDomId: (index: number) => string
  onActivate: (index: number) => void
  /**
   * Index when the panel opens without an explicit openAndFocus target
   * (e.g. mouse click). Defaults to 0.
   */
  getDefaultOpenIndex?: () => number
  onOpen?: () => void
}

/**
 * Shared listbox keyboard navigation for DropdownV2 / FilterDropdownV2.
 * openAndFocus sets a pending index so watch(open) cannot overwrite ArrowUp → last.
 */
export function useListboxKeyboard(options: UseListboxKeyboardOptions) {
  const {
    open,
    activeIndex,
    disabled = false,
    getOptionCount,
    isOptionDisabled = () => false,
    getOptionDomId,
    onActivate,
    getDefaultOpenIndex = () => 0,
    onOpen,
  } = options

  let pendingFocusIndex: number | null = null

  const clampIndex = (index: number) => {
    const total = getOptionCount()
    if (total <= 0) {
      return -1
    }

    return Math.min(Math.max(index, 0), total - 1)
  }

  const focusActiveOption = async () => {
    await nextTick()
    const index = activeIndex.value
    if (index < 0) {
      return
    }

    document.getElementById(getOptionDomId(index))?.focus()
  }

  const openAndFocus = async (indexOrGetter: number | (() => number) = 0) => {
    onOpen?.()
    pendingFocusIndex =
      typeof indexOrGetter === 'function' ? indexOrGetter() : indexOrGetter
    open.value = true
    await nextTick()

    if (pendingFocusIndex != null) {
      activeIndex.value = clampIndex(pendingFocusIndex)
      pendingFocusIndex = null
    }

    await focusActiveOption()
  }

  const moveActive = (delta: number) => {
    const total = getOptionCount()
    if (total === 0) {
      return
    }

    let next = activeIndex.value
    for (let step = 0; step < total; step += 1) {
      next = (next + delta + total) % total
      if (!isOptionDisabled(next)) {
        activeIndex.value = next
        focusActiveOption()
        return
      }
    }
  }

  const activateFirstEnabled = () => {
    activeIndex.value = -1
    moveActive(1)
  }

  const activateLastEnabled = () => {
    activeIndex.value = getOptionCount()
    moveActive(-1)
  }

  const onTriggerKeydown = (event: KeyboardEvent) => {
    if (toValue(disabled)) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!open.value) {
        openAndFocus(0)
        return
      }

      if (activeIndex.value >= 0) {
        onActivate(activeIndex.value)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open.value) {
        openAndFocus(0)
        return
      }

      moveActive(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open.value) {
        openAndFocus(() => Math.max(getOptionCount() - 1, 0))
        return
      }

      moveActive(-1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      if (!open.value) {
        openAndFocus(0)
        return
      }

      activateFirstEnabled()
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      if (!open.value) {
        openAndFocus(() => Math.max(getOptionCount() - 1, 0))
        return
      }

      activateLastEnabled()
      return
    }

    if (event.key === 'Escape' && open.value) {
      event.preventDefault()
      open.value = false
    }
  }

  const onPanelKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActive(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(-1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      activateFirstEnabled()
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      activateLastEnabled()
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (activeIndex.value >= 0) {
        event.preventDefault()
        onActivate(activeIndex.value)
      }
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      open.value = false
    }
  }

  watch(open, (isOpen) => {
    if (isOpen) {
      if (pendingFocusIndex != null) {
        activeIndex.value = clampIndex(pendingFocusIndex)
        pendingFocusIndex = null
        return
      }

      onOpen?.()
      activeIndex.value = clampIndex(getDefaultOpenIndex())
      return
    }

    activeIndex.value = -1
    pendingFocusIndex = null
  })

  return {
    focusActiveOption,
    openAndFocus,
    moveActive,
    onTriggerKeydown,
    onPanelKeydown,
  }
}
