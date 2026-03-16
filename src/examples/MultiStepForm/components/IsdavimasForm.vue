<!-- eslint-disable vue/no-v-html -->
<template>
  <RcSesAlert
    variant="light"
    type="warning"
    class="form-control"
    title="Warning"
    closable
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    <a href="https://www.registrucentras.lt/" target="_blank" rel="noopener noreferrer">
      Daugiau informacijos
    </a>
  </RcSesAlert>

  <RcSesNumberStepperField
    v-model="modelSkaicius"
    v-bind="modelSkaiciusProps"
    :error="errors.skaicius"
    class="form-control"
    field-label="Skaičius"
    :max-width="300"
  />

  <RcSesRadioButtonsField
    v-model="modelIsdavimoBudas"
    v-bind="modelIsdavimoBudasProps"
    :error="errors.isdavimoBudas"
    field-label="Išdavimo būdas"
    :field-wrapper-props="{ class: 'form-control' }"
    :options="[
      { label: 'El. paštu', value: 'option1' },
      { label: 'Padalinye', value: 'option2' },
      { label: 'Paštu Lietuvoje', value: 'option3' },
      { label: 'Paštu užsienyje', value: 'option4' },
    ]"
  ></RcSesRadioButtonsField>

  <RcSesSelectField
    v-model="modelPadalinys"
    v-bind="modelPadalinysProps"
    :error="errors.padalinys"
    :field-wrapper-props="{ class: 'form-control' }"
    field-label="RC padalinys"
    placeholder="Pasirinkite"
    :searchable="false"
    :multiple="false"
    :messages="messages"
    :items="[
      {
        title: 'Padalinys 1',
        value: 'p1',
        subtitle:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      { title: 'Padalinys 2', value: 'p2' },
      { title: 'Padalinys 3', value: 'p3' },
      {
        title: 'Padalinys 4',
        value: 'p4',
        subtitle:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ]"
  >
    <template #message="{ message }">
      <div v-html="message"></div>
    </template>
  </RcSesSelectField>
</template>

<script setup lang="ts">
import { inject } from 'vue'

import RcSesAlert from '@/components/common/Alert/RcSesAlert.vue'
import RcSesNumberStepperField from '@/components/common/inputs/NumberSteppers/NumberStepperField/RcSesNumberStepperField.vue'
import RcSesRadioButtonsField from '@/components/common/inputs/RadioButtonsField/RcSesRadioButtonsField.vue'
import RcSesSelectField from '@/components/common/inputs/SelectField/RcSesSelectField.vue'
import UseFormType from '@/types/forms/UseFormType'

const formController = inject<UseFormType>('formController')

if (!formController) {
  throw new Error('Form controller is not provided')
}
const { errors, defineField } = formController

const [modelIsdavimoBudas, modelIsdavimoBudasProps] = defineField('isdavimoBudas')
const [modelPadalinys, modelPadalinysProps] = defineField('padalinys')
const [modelSkaicius, modelSkaiciusProps] = defineField('skaicius')

const messages = [
  'Informacija apie <a href="https://www.registrucentras.lt/" target="_blank">RC Padalinius</a>',
]
</script>
