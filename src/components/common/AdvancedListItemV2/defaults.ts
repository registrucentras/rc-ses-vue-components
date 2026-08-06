import type {
  AdvancedListItemContainer,
  AdvancedListItemProps,
  AdvancedListItemWrap,
} from '@/components/common/AdvancedListItemV2/types'

export type AdvancedListItemDefaultsType = Required<
  Omit<AdvancedListItemProps, 'title' | 'subtitle'>
> & {
  container: AdvancedListItemContainer
  wrap: AdvancedListItemWrap
}

const advancedListItemV2Defaults = {
  container: 'card',
  wrap: 'auto',
  showLeading: true,
  showLeadingMedia: false,
  showTrailing: true,
  showSubtitle: true,
  showMeta: false,
  showBadge: false,
  showExpanded: false,
  level: 0,
  selectable: false,
  selected: false,
  disabled: false,
  error: false,
} satisfies AdvancedListItemDefaultsType

export default advancedListItemV2Defaults
