export type DatePickerV2DefaultsType = {
  range: boolean
  format: string
  disabled: boolean
  optional: boolean
  showLabel: boolean
  showExplainer: boolean
  showHelper: boolean
}

const datePickerV2Defaults = {
  range: false,
  format: 'yyyy-MM-dd',
  disabled: false,
  optional: false,
  showLabel: true,
  showExplainer: true,
  showHelper: true,
} satisfies DatePickerV2DefaultsType

export default datePickerV2Defaults
