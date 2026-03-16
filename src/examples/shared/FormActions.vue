<template>
  <RcSesButton
    variant="text"
    color="primary-700"
    prepend-icon="$prev"
    class="font-weight-regular"
    >Baigti pildyti vėliau</RcSesButton
  >
  <div class="flex-grow-1" />
  <RcSesButton size="large" class="text-body-2 font-weight-strong" @click="submit">
    Pridėti į krepšelį
    <template #append>
      <ArrowRightIcon color="grey-900" />
    </template>
  </RcSesButton>
</template>

<script setup lang="ts">
import { inject } from 'vue'

import ArrowRightIcon from '@/assets/icons/regular/ArrowRightIcon.vue'
import RcSesButton from '@/components/common/buttons/Button/RcSesButton.vue'
import UseFormType from '@/types/forms/UseFormType'

const formController = inject<UseFormType>('formController')

const submit = () => {
  if (formController) {
    formController.submitForm()

    if (formController.meta.value.valid) {
      // eslint-disable-next-line no-console
      console.log('Form is valid', formController.values)
    }
  }
}
</script>
