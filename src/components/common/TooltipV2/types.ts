export type TooltipV2Placement = 'top' | 'bottom' | 'left' | 'right'

export type TooltipV2Props = {
  text?: string
  title?: string
  description?: string
  placement?: TooltipV2Placement
  offset?: number | string | number[]
  disabled?: boolean
  maxWidth?: number | string
  openOnHover?: boolean
  openOnFocus?: boolean
  openOnClick?: boolean
  accessibleLabel?: string
}
