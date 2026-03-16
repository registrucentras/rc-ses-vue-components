<template>
  <form>
    <RcSesFormContainer
      :accordion-controller="accordionController"
      :form-controller="formController"
      :show-progress-stepper="true"
      :show-accordion-collapse-controls="true"
      max-width="lg"
    >
      <template #form-stepper="{ state }">
        <RcSesFormStepper
          class="custom-stepper"
          :items="state"
          style="margin-top: 2.875rem"
        ></RcSesFormStepper>
      </template>

      <template #actions>
        <FormActions />
      </template>

      <template #actions-after>
        <FormActionsAfter />
      </template>

      <template #default>
        <RcSesAccordion id="basicForm" />

        <RcSesAccordion id="issueForm">
          <IsdavimasForm />
        </RcSesAccordion>

        <RcSesAccordion id="additionalServicesForm">
          <PapildomosPaslaugosForm :form-controller="formController" />
        </RcSesAccordion>
        <RcSesAccordion id="serviceForm">
          <PaslaugosUzsakymasForm :form-controller="formController" />
        </RcSesAccordion>

        <RcSesAccordion id="termsForm">
          <TerminaiForm />
        </RcSesAccordion>
      </template>
    </RcSesFormContainer>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import RcSesAccordion from '@/components/common/Accordion/RcSesAccordion.vue'
import useAccordionController from '@/components/common/Accordion/hooks/useAccordionController'
import RcSesFormContainer from '@/components/layouts/FormContainer/RcSesFormContainer.vue'
import RcSesFormStepper from '@/components/layouts/FormStepper/RcSesFormStepper.vue'
import IsdavimasForm from '@/examples/MultiStepForm/components/IsdavimasForm.vue'
import PapildomosPaslaugosForm from '@/examples/MultiStepForm/components/PapildomosPaslaugosForm.vue'
import PaslaugosUzsakymasForm from '@/examples/MultiStepForm/components/PaslaugosUzsakymasForm.vue'
import TerminaiForm from '@/examples/MultiStepForm/components/TerminaiForm.vue'
import FormActions from '@/examples/shared/FormActions.vue'
import FormActionsAfter from '@/examples/shared/FormActionsAfter.vue'

const accordionController = useAccordionController({
  basicForm: {
    expanded: false,
    state: 'completed',
    title: 'Bazinė informacija',
  },
  issueForm: {
    expanded: false,
    state: 'error',
    title: 'Išdavimas',
  },
  additionalServicesForm: {
    expanded: false,
    state: 'pending',
    title: 'Reikalingos papildomos paslaugos',
  },
  serviceForm: {
    expanded: true,
    state: 'active',
    title: 'Paslaugos užsakymas',
    onClick: (item) => {
      // eslint-disable-next-line no-console
      console.log('serviceForm clicked', item)
    },
  },
  termsForm: {
    expanded: false,
    state: 'pending',
    title: 'Terminai ir sąlygos',
  },
})

const FormSchema = yup.object({
  isdavimoBudas: yup.string().required(),
  padalinys: yup.string().required(),
  skaicius: yup.number().required().min(5),
  paslauga: yup.string().required(),

  tikslas: yup.array().required(),
  teisinisPagrindas: yup.string().required(),
  sutikimas: yup.boolean().required(),
  terminas: yup.string().required(),
  egzemplioriuSkaicius: yup.number().required().min(5),

  terminoSutikimas: yup.boolean().required(),
})

const formController = useForm({
  validationSchema: toTypedSchema(FormSchema),
})
</script>
