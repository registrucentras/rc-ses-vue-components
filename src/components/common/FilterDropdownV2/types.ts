export type FilterDropdownValue = string | number

export type FilterDropdownOption = {
  value: FilterDropdownValue
  title: string
  disabled?: boolean
}

export type FilterDropdownProps = {
  label: string
  options?: FilterDropdownOption[]
  disabled?: boolean
  accessibleLabel?: string
  maxHeight?: number | string
}
