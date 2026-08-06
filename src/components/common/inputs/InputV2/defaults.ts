import type { InputV2Type } from '@/components/common/inputs/InputV2/types'

export type InputV2DefaultsType = {
  type: InputV2Type
  disabled: boolean
  readonly: boolean
  loading: boolean
  optional: boolean
  clearable: boolean
  showLabel: boolean
  showExplainer: boolean
  showHelper: boolean
  showLeading: boolean
  showTrailing: boolean
}

const inputV2Defaults = {
  type: 'text',
  disabled: false,
  readonly: false,
  loading: false,
  optional: false,
  clearable: false,
  showLabel: true,
  showExplainer: true,
  showHelper: true,
  showLeading: true,
  showTrailing: true,
} satisfies InputV2DefaultsType

export default inputV2Defaults
