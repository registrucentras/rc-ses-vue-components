import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesAdvancedListItemV2 from '@/components/common/AdvancedListItemV2/RcSesAdvancedListItemV2.vue'
import RcSesAdvancedListV2 from '@/components/common/AdvancedListV2/RcSesAdvancedListV2.vue'
import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import RcSesPriceDisplayV2 from '@/components/common/PriceDisplayV2/RcSesPriceDisplayV2.vue'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesToggleV2 from '@/components/common/toggleV2/RcSesToggleV2.vue'

const meta: Meta<typeof RcSesAdvancedListItemV2> = {
  title: 'componentsV2/AdvancedListItem',
  component: RcSesAdvancedListItemV2,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['card', 'row'],
      description: 'Card = bordered tile; Row = divider list row',
    },
    wrap: {
      control: 'select',
      options: ['auto', 'off', 'stacked'],
      description:
        'Layout axis (prop, not breakpoint). Auto = horizontal back-compat; Off = single-line title + ellipsis; Stacked = mobile (trailing on top, content below).',
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showLeading: {
      control: 'boolean',
      description: 'Toggle #leading slot visibility',
    },
    showLeadingMedia: {
      control: 'boolean',
      description: 'Toggle #leading-media slot visibility',
    },
    showTrailing: {
      control: 'boolean',
      description: 'Toggle #trailing slot visibility',
    },
    showSubtitle: { control: 'boolean' },
    showMeta: {
      control: 'boolean',
      description: 'Toggle #meta slot visibility',
    },
    showBadge: {
      control: 'boolean',
      description: 'Toggle #badge slot visibility',
    },
    showExpanded: {
      control: 'boolean',
      description: 'Toggle #expanded slot visibility',
    },
    level: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Nesting indent level (0 = root)',
    },
    selectable: {
      control: 'boolean',
      description: 'Whole-item click/keyboard select',
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesAdvancedListItemV2>

export const Default: Story = (args) => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesCheckboxV2,
    RcSesBadgeV2,
    RcSesButtonV2,
  },
  setup() {
    const onSelect = () => {
      if (!args.selectable || args.disabled) {
        return
      }
      // Storybook args proxy — toggle selected for Controls playground
      // eslint-disable-next-line no-param-reassign -- intentional Controls sync
      args.selected = !args.selected
    }

    return { args, onSelect }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 accessible-label="List item playground">
            <RcSesAdvancedListItemV2 v-bind="args" @select="onSelect">
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="args.selected"
                  :show-label="false"
                  accessible-label="Select item"
                />
              </template>
              <template #leading-media>
                <span style="font-weight: 600;">AB</span>
              </template>
              <template #badge>
                <RcSesBadgeV2 type="info" size="small">Label</RcSesBadgeV2>
              </template>
              <template #meta>
                <span class="text-body-caption-v2">Meta one</span>
                <span class="text-body-caption-v2">Meta two</span>
              </template>
              <template #trailing>
                <RcSesButtonV2 variant="link" size="small">Action</RcSesButtonV2>
              </template>
              <template #expanded>
                Expanded panel content.
              </template>
              Optional description slot.
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
Default.args = {
  container: 'card',
  wrap: 'auto',
  title: 'Item title',
  subtitle: 'Supporting subtitle',
  showLeading: true,
  showLeadingMedia: false,
  showTrailing: true,
  showSubtitle: true,
  showMeta: false,
  showBadge: true,
  showExpanded: false,
  level: 0,
  selectable: true,
  selected: false,
  disabled: false,
  error: false,
}

export const Containers: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesButtonV2,
    RcSesPriceDisplayV2,
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story" style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <p class="text-body-small-v2" style="margin-bottom: 8px;">Card</p>
            <RcSesAdvancedListV2 variant="card" accessible-label="Card container">
              <RcSesAdvancedListItemV2
                container="card"
                title="Card item"
                subtitle="Bordered tile with gap"
                :show-leading="false"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesButtonV2 variant="link" size="small">Action</RcSesButtonV2>
                </template>
              </RcSesAdvancedListItemV2>
            </RcSesAdvancedListV2>
          </div>
          <div>
            <p class="text-body-small-v2" style="margin-bottom: 8px;">Row</p>
            <RcSesAdvancedListV2 variant="row" accessible-label="Row container">
              <RcSesAdvancedListItemV2
                container="row"
                title="Row item"
                subtitle="Divider layout"
                :show-leading="false"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesPriceDisplayV2 price="12.00 €" label="VAT incl." />
                </template>
              </RcSesAdvancedListItemV2>
              <RcSesAdvancedListItemV2
                container="row"
                title="Another row"
                subtitle="Second entry"
                :show-leading="false"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesPriceDisplayV2 price="4.16 €" label="VAT incl." />
                </template>
              </RcSesAdvancedListItemV2>
            </RcSesAdvancedListV2>
          </div>
        </div>
      </div>
    </div>
  `,
})

export const States: Story = () => ({
  components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 accessible-label="Item states">
            <RcSesAdvancedListItemV2
              title="Rest"
              :show-leading="false"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              title="Selected"
              selected
              :show-leading="false"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              title="Error"
              error
              :show-leading="false"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              title="Disabled"
              disabled
              :show-leading="false"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
            />
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})

export const Selectable: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesCheckboxV2,
  },
  setup() {
    const items = [
      { id: 'a', title: 'Option A', subtitle: 'Click the card to toggle' },
      { id: 'b', title: 'Option B', subtitle: 'Click the card to toggle' },
      { id: 'c', title: 'Option C', subtitle: 'Click the card to toggle' },
    ]
    const selectedIds = ref<string[]>(['a'])

    const isSelected = (id: string) => selectedIds.value.includes(id)

    const toggle = (id: string) => {
      if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter((value) => value !== id)
        return
      }
      selectedIds.value = [...selectedIds.value, id]
    }

    return { items, selectedIds, isSelected, toggle }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <p class="text-body-small-v2" style="margin-bottom: 12px;">
            Selected: {{ selectedIds.join(', ') || 'none' }}
          </p>
          <RcSesAdvancedListV2 multiselectable accessible-label="Selectable items">
            <RcSesAdvancedListItemV2
              v-for="item in items"
              :key="item.id"
              :title="item.title"
              :subtitle="item.subtitle"
              selectable
              :selected="isSelected(item.id)"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle(item.id)"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="isSelected(item.id)"
                  :show-label="false"
                  :accessible-label="item.title"
                />
              </template>
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})

export const Trailing: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesButtonV2,
    RcSesToggleV2,
    RcSesBadgeV2,
    RcSesPriceDisplayV2,
  },
  setup() {
    const enabled = ref(false)
    return { enabled }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 accessible-label="Trailing examples">
            <RcSesAdvancedListItemV2
              title="Actions"
              subtitle="Edit / remove links"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesButtonV2 variant="link" size="small" prepend-icon="$notePencil">Edit</RcSesButtonV2>
                <RcSesButtonV2 variant="link" size="small" prepend-icon="$trash">Remove</RcSesButtonV2>
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              title="Toggle"
              subtitle="Independent control"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesToggleV2 v-model="enabled" :show-label="false" aria-label="Enable" />
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              title="Badge"
              subtitle="Status example"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesBadgeV2 type="warning" show-icon>Pending</RcSesBadgeV2>
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              title="Price"
              subtitle="Amount display"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesPriceDisplayV2 price="12.00 €" label="VAT incl." />
              </template>
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})

export const WithSlots: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesButtonV2,
    RcSesBadgeV2,
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 accessible-label="All slots">
            <RcSesAdvancedListItemV2
              title="Item with all common slots"
              subtitle="Subtitle text"
              show-leading-media
              :show-expanded="true"
            >
              <template #leading>
                <RcSesButtonV2 variant="link" size="small" icon="$caretUp" accessible-label="Move up" />
                <RcSesButtonV2 variant="link" size="small" icon="$caretDown" accessible-label="Move down" />
              </template>
              <template #leading-media>
                <span style="font-weight: 600;">AB</span>
              </template>
              <template #badge>
                <RcSesBadgeV2 type="info" size="small">Label</RcSesBadgeV2>
              </template>
              <template #meta>
                <span class="text-body-caption-v2">Meta one</span>
                <span class="text-body-caption-v2">Meta two</span>
              </template>
              <template #trailing>
                <RcSesButtonV2 variant="link" size="small" prepend-icon="$notePencil">Edit</RcSesButtonV2>
                <RcSesButtonV2 variant="link" size="small" prepend-icon="$trash">Remove</RcSesButtonV2>
              </template>
              <template #expanded>
                Optional expanded panel content.
              </template>
              Optional description slot content.
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})

export const Wrap: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesButtonV2,
    RcSesBadgeV2,
    RcSesCheckboxV2,
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story" style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <p class="text-body-small-v2" style="margin-bottom: 8px;">
              Auto — default horizontal layout (back-compat)
            </p>
            <RcSesAdvancedListV2 accessible-label="Wrap auto">
              <RcSesAdvancedListItemV2
                wrap="auto"
                title="Option A1"
                subtitle="Supporting detail A1"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$notePencil">Edit</RcSesButtonV2>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$trash">Remove</RcSesButtonV2>
                </template>
              </RcSesAdvancedListItemV2>
            </RcSesAdvancedListV2>
          </div>

          <div style="max-width: 220px;">
            <p class="text-body-small-v2" style="margin-bottom: 8px;">
              Off — narrow tile; title single line + ellipsis
            </p>
            <RcSesAdvancedListV2 accessible-label="Wrap off">
              <RcSesAdvancedListItemV2
                wrap="off"
                title="Very long option title that should truncate with an ellipsis"
                subtitle="Supporting detail B1"
                :show-leading="false"
                :show-trailing="false"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              />
            </RcSesAdvancedListV2>
          </div>

          <div style="max-width: 375px;">
            <p class="text-body-small-v2" style="margin-bottom: 8px;">
              Stacked — mobile (trailing top-right; content full width below). Practical min ~250px with two actions.
            </p>
            <RcSesAdvancedListV2 accessible-label="Wrap stacked">
              <RcSesAdvancedListItemV2
                wrap="stacked"
                title="Option C1"
                subtitle="Supporting detail C1"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$notePencil">Edit</RcSesButtonV2>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$trash">Remove</RcSesButtonV2>
                </template>
              </RcSesAdvancedListItemV2>

              <RcSesAdvancedListItemV2
                wrap="stacked"
                title="Option C2"
                subtitle="Supporting detail C2"
                :show-meta="false"
                :show-badge="false"
                :show-expanded="false"
              >
                <template #trailing>
                  <RcSesBadgeV2 type="warning" size="small">Pending</RcSesBadgeV2>
                </template>
              </RcSesAdvancedListItemV2>

              <RcSesAdvancedListItemV2
                wrap="stacked"
                title="Option C3"
                subtitle="Supporting detail C3"
                selectable
                selected
                :show-meta="false"
                :show-badge="false"
                :show-trailing="false"
                :show-expanded="false"
              >
                <template #leading>
                  <RcSesCheckboxV2
                    :model-value="true"
                    :show-label="false"
                    accessible-label="Option C3"
                  />
                </template>
              </RcSesAdvancedListItemV2>

              <RcSesAdvancedListItemV2
                wrap="stacked"
                title="Option C4 with slots"
                subtitle="Supporting detail C4"
                show-leading-media
                show-badge
                show-meta
                :show-expanded="true"
              >
                <template #leading>
                  <RcSesButtonV2 variant="link" size="small" icon="$caretUp" accessible-label="Move up" />
                  <RcSesButtonV2 variant="link" size="small" icon="$caretDown" accessible-label="Move down" />
                </template>
                <template #leading-media>
                  <span style="font-weight: 600;">AB</span>
                </template>
                <template #badge>
                  <RcSesBadgeV2 type="info" size="small">Label</RcSesBadgeV2>
                </template>
                <template #meta>
                  <span class="text-body-caption-v2">Meta one</span>
                  <span class="text-body-caption-v2">Meta two</span>
                </template>
                <template #trailing>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$notePencil">Edit</RcSesButtonV2>
                  <RcSesButtonV2 variant="link" size="small" prepend-icon="$trash">Remove</RcSesButtonV2>
                </template>
                <template #expanded>
                  Optional expanded panel content.
                </template>
                Optional description slot content.
              </RcSesAdvancedListItemV2>
            </RcSesAdvancedListV2>
          </div>
        </div>
      </div>
    </div>
  `,
})
