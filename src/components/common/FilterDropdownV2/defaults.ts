import type { FilterDropdownOption } from '@/components/common/FilterDropdownV2/types'

export type FilterDropdownDefaultsType = {
  options: () => FilterDropdownOption[]
  disabled: boolean
  maxHeight: number
}

const filterDropdownV2Defaults = {
  options: (): FilterDropdownOption[] => [],
  disabled: false,
  maxHeight: 320,
} satisfies FilterDropdownDefaultsType

export default filterDropdownV2Defaults
