export type InputV2Type = 'text' | 'password'

export type InputV2Props = {
  modelValue?: string
  type?: InputV2Type
  label?: string
  helper?: string
  /** Error message, or `true` for error styling without message */
  error?: string | boolean
  explainer?: string
  explainerTitle?: string
  placeholder?: string
  accessibleLabel?: string
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  /** Shows “(neprivaloma)” after label */
  optional?: boolean
  clearable?: boolean
  showLabel?: boolean
  showExplainer?: boolean
  showHelper?: boolean
  showLeading?: boolean
  showTrailing?: boolean
  id?: string
}
