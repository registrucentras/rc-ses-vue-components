import type {
  FiltersFilter,
  FiltersModelValue,
} from '@/components/common/FiltersV2/types'

export type FiltersDefaultsType = {
  filters: () => FiltersFilter[]
  searchDebounceMs: number
  maxVisibleFilters: number
  showSearch: boolean
  showClear: boolean
  disabled: boolean
  mobileBreakpoint: number
}

export const emptyFiltersModel = (): FiltersModelValue => ({
  search: '',
  selections: {},
})

const filtersV2Defaults = {
  filters: (): FiltersFilter[] => [],
  searchDebounceMs: 300,
  maxVisibleFilters: 4,
  showSearch: true,
  showClear: true,
  disabled: false,
  mobileBreakpoint: 720,
} satisfies FiltersDefaultsType

export default filtersV2Defaults
