export type DatePickerV2DateString = string

export type DatePickerV2RangeValue = [
  DatePickerV2DateString | null,
  DatePickerV2DateString | null,
]

export type DatePickerV2ModelValue =
  | DatePickerV2DateString
  | DatePickerV2RangeValue
  | null

export type DatePickerV2Props = {
  /** Enables start/end range selection */
  range?: boolean
  /** Display / parse format for the trigger (date-fns). Default `yyyy-MM-dd` */
  format?: string
  /** Earliest selectable date (`yyyy-MM-dd`) */
  minDate?: DatePickerV2DateString
  /** Latest selectable date (`yyyy-MM-dd`) */
  maxDate?: DatePickerV2DateString
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
}

export type DatePickerV2CalendarDay = {
  date: Date
  iso: string
  dayNumber: number
  outside: boolean
  today: boolean
  disabled: boolean
}
