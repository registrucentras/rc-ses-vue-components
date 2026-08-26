import type { ErrorSummaryError } from '@/components/common/ErrorSummaryV2/types'

const errorSummaryV2Defaults = {
  errors: (): ErrorSummaryError[] => [],
  autofocus: true,
}

export default errorSummaryV2Defaults
