<template>
  <div class="rc-searchable-area">
    <RcSesSearchField
      v-model="model"
      append-icon="$close"
      placeholder="Ieškoti"
      @click:append="() => clear()"
    >
      <template #clear><span></span></template>
      <template v-if="multiple" #prepend>
        <v-checkbox
          v-model="checkAll"
          base-color="white"
          color="primary"
          hide-details
          @change="$emit('updateCheckAll', checkAll)"
        ></v-checkbox>
      </template>
    </RcSesSearchField>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import RcSesSearchField from '@/components/common/inputs/SearchField/RcSesSearchField.vue'

import './style.scss'

const emits = defineEmits(['updateCheckAll', 'cleared'])
const checkAll = ref<boolean>(false)
const model = defineModel<string | number>()

defineProps({
  multiple: Boolean,
})

const clear = () => {
  model.value = ''
  emits('cleared')
}
</script>
