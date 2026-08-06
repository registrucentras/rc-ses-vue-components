import type { TooltipV2Placement } from './types'

export type TooltipV2DefaultsType = {
  placement: TooltipV2Placement
  offset: number
  disabled: boolean
  maxWidth: number
  openOnHover: boolean
  openOnFocus: boolean
  openOnClick: boolean
}

const tooltipV2Defaults = {
  placement: 'top',
  offset: 4,
  disabled: false,
  maxWidth: 280,
  openOnHover: true,
  openOnFocus: true,
  openOnClick: false,
} satisfies TooltipV2DefaultsType

export default tooltipV2Defaults
