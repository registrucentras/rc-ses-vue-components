export type DropdownV2Value = string | number

export type DropdownV2Item = {
  value: DropdownV2Value
  title: string
  count?: number | string
  disabled?: boolean
  items?: DropdownV2Item[]
}

export type DropdownV2Props = {
  items?: DropdownV2Item[]
  multiple?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  showAllOption?: boolean
  allOptionTitle?: string
  allOptionValue?: DropdownV2Value
  footerText?: string
  label?: string
  helper?: string
  error?: string | boolean
  explainer?: string
  explainerTitle?: string
  placeholder?: string
  accessibleLabel?: string
  disabled?: boolean
  optional?: boolean
  showLabel?: boolean
  showExplainer?: boolean
  showHelper?: boolean
  id?: string
  maxHeight?: number | string
}

export type DropdownV2FlatOption = {
  key: string
  kind: 'all' | 'group' | 'item'
  value: DropdownV2Value
  title: string
  count?: number | string
  disabled?: boolean
  indented?: boolean
  childValues?: DropdownV2Value[]
  visibleChildValues?: DropdownV2Value[]
}
