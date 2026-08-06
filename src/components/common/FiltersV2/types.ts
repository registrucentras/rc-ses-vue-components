import type { FilterDropdownOption } from '@/components/common/FilterDropdownV2/types'

export type FiltersFilter = {
  id: string
  label: string
  options: FilterDropdownOption[]
  disabled?: boolean
}

export type FiltersSelections = Record<string, (string | number)[]>

export type FiltersModelValue = {
  search: string
  selections: FiltersSelections
}

export type FiltersProps = {
  filters?: FiltersFilter[]
  /**
   * Optional summary line below the bar (e.g. "Found 12 entries · 2 filters applied").
   * Fully parent-owned — the component does not build this text automatically.
   */
  resultsSummary?: string
  searchPlaceholder?: string
  searchDebounceMs?: number
  maxVisibleFilters?: number
  showSearch?: boolean
  showClear?: boolean
  disabled?: boolean
  accessibleLabel?: string
  mobileBreakpoint?: number
}
