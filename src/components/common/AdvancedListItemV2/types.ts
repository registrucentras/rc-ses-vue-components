export type AdvancedListItemContainer = 'card' | 'row'

/**
 * Layout axis for item slots (prop, not a breakpoint).
 * - auto: existing horizontal row (back-compat default)
 * - off: horizontal; title clamped to one line with ellipsis (narrow tiles)
 * - stacked: top row Leading/Media + Trailing; Content full-width below (mobile)
 */
export type AdvancedListItemWrap = 'auto' | 'off' | 'stacked'

export type AdvancedListItemProps = {
  /** Card = bordered tile; Row = divider list row */
  container?: AdvancedListItemContainer
  /**
   * Slot layout. Auto = current behaviour; Off = single-line title;
   * Stacked = mobile row (actions/status on top, content below).
   */
  wrap?: AdvancedListItemWrap
  title: string
  subtitle?: string
  showLeading?: boolean
  showLeadingMedia?: boolean
  showTrailing?: boolean
  showSubtitle?: boolean
  showMeta?: boolean
  showBadge?: boolean
  showExpanded?: boolean
  /** Nesting depth for indented sub-items (0 = root) */
  level?: number
  selectable?: boolean
  selected?: boolean
  disabled?: boolean
  error?: boolean
}
