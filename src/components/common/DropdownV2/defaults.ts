import type { DropdownV2Item } from '@/components/common/DropdownV2/types'

export type DropdownV2DefaultsType = {
  items: () => DropdownV2Item[]
  multiple: boolean
  searchable: boolean
  showAllOption: boolean
  allOptionValue: string
  disabled: boolean
  optional: boolean
  showLabel: boolean
  showExplainer: boolean
  showHelper: boolean
  maxHeight: number
}

const dropdownV2Defaults = {
  items: (): DropdownV2Item[] => [],
  multiple: false,
  searchable: true,
  showAllOption: false,
  allOptionValue: 'all',
  disabled: false,
  optional: false,
  showLabel: true,
  showExplainer: true,
  showHelper: true,
  maxHeight: 320,
} satisfies DropdownV2DefaultsType

export default dropdownV2Defaults
