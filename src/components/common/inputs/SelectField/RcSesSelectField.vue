<!-- eslint-disable vue/no-v-html -->
<template>
  <RcSesFieldWrapper
    :label="fieldLabel"
    :description="fieldDescription"
    :tooltip="fieldTooltip"
    :tooltip-title="fieldTooltipTitle"
    :tooltip-on-click="fieldTooltipOnClick"
    :for="name"
    :required="required"
  >
    <v-select
      v-bind="$attrs"
      :id="name"
      ref="selectRef"
      v-model="model"
      :name="name"
      class="rc-field rc-select-field"
      variant="outlined"
      :placeholder="placeholder"
      :items="computedItems"
      :hide-details="!(!!error || !!counter || !!messages)"
      :error="!!error"
      :error-messages="error"
      :menu-props="menuProps"
      :messages="messages"
      :readonly="readonly"
      :disabled="disabled"
      transition="scroll-y-transition"
      :multiple="multiple"
      @update:menu="updateVList"
      @update:focused="() => (searchValue = '')"
    >
      <template v-if="$slots['message']" #message="binds">
        <slot name="message" v-bind="binds" />
      </template>

      <template v-if="$slots['details']" #details="binds">
        <slot name="details" v-bind="binds" />
      </template>

      <template v-if="searchable" #prepend-item>
        <RcSesSearchableArea
          v-model="searchValue"
          :multiple="multiple"
          @update-check-all="checkAll"
        />
      </template>

      <template v-if="searchable" #no-data>
        <v-list-item class="rc-menu-list-item">{{
          t('RcSesSelectField.noData', { ns: 'components' })
        }}</v-list-item>
      </template>

      <template #item="{ item, props }">
        <v-list-item
          v-bind="props"
          class="rc-menu-list-item"
          :append-icon="model === item.value ? '$checkPrimary' : undefined"
        >
          <template #subtitle>
            <div v-html="item.raw.subtitle"></div>
          </template>

          <template #prepend>
            <v-checkbox
              v-if="multiple"
              base-color="white"
              color="primary"
              :model-value="model?.includes(item.value)"
              hide-details
            ></v-checkbox>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </RcSesFieldWrapper>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref, watch } from 'vue'

import RcSesFieldWrapper from '@/components/common/inputs/FieldWrapper/RcSesFieldWrapper.vue'
import RcSesSearchableArea from '@/components/common/inputs/SearchableArea/RcSesSearchableArea.vue'
import SelectFieldDefaults from '@/components/common/inputs/SelectField/defaults'
import type {
  SelectFieldItemType,
  SelectFieldProps,
} from '@/components/common/inputs/SelectField/type'

import './style.scss'

const { t } = useTranslation()

defineOptions({
  inheritAttrs: false,
})

const selectProps = withDefaults(defineProps<SelectFieldProps>(), SelectFieldDefaults)

const model = defineModel<any[] | null | undefined>()

const selectRef = ref()
const searchValue = ref<string>()

const menuId = uuidv4()
const menuProps = ref({
  id: menuId,
  offset: 6,
  class: { 'rc-searchable-menu': selectProps.searchable },
})

const getItemValueForSearch = (item: SelectFieldItemType): string => {
  return `${item.title} ${item?.subtitle}`.toLowerCase()
}

const getItemValue = (item: SelectFieldItemType): string => {
  if (typeof item.value === 'string') {
    return item.value
  }

  return item.value.toString()
}

const computedItems = computed(() => {
  if (!searchValue.value?.trim()) {
    return selectProps.items
  }

  return selectProps.items.filter((item: SelectFieldItemType) =>
    searchValue.value
      ? getItemValueForSearch(item).includes(searchValue.value.toLowerCase().trim())
      : false,
  )
})

const updateVList = () => {
  // nextTick() - not always works, especially when searchValue becomes empty
  setTimeout(() => {
    const menu = document.getElementById(menuId)

    if (!menu) {
      return
    }

    const list = menu.querySelector('.v-list')

    if (!list) {
      return
    }

    if (list.scrollHeight > list.clientHeight) {
      list.classList.add('rc-scrollable')
    } else {
      list.classList.remove('rc-scrollable')
    }
  }, 200)
}

watch(computedItems, () => {
  updateVList()
})

const checkAll = (value: boolean) => {
  model.value = value
    ? computedItems.value.map((item: SelectFieldItemType) => getItemValue(item))
    : []
}
</script>
