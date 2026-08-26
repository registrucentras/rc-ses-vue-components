export type ErrorSummaryItem = {
  message: string
  fieldId?: string
  id?: string
}

export type ErrorSummaryError = ErrorSummaryItem | string

export type ErrorSummaryProps = {
  errors?: ErrorSummaryError[]
  title?: string
  autofocus?: boolean
}
