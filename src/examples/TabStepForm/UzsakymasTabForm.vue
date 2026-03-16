<template>
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="FormSchema" as="div">
    <form @submit="handleSubmit($event, onSubmit)">
      <Field v-slot="fieldProps" name="trumpas_tekstas">
        <RcSesTextField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Trumpas tekstas"
          field-description="lorem ipsum."
          name="trumpas_tekstas"
          placeholder="Tekstas"
          messages="Lorem Ipsum is simply dummy text."
          counter="10"
        ></RcSesTextField>
      </Field>

      <Field v-slot="fieldProps" name="ilgas_tekstas">
        <RcSesTextField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          field-label="Ilgas tekstas"
          field-description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          name="ilgas_tekstas"
          placeholder="Tekstas"
          messages="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          counter="300"
        ></RcSesTextField>
      </Field>

      <Field v-slot="fieldProps" name="tikslas">
        <RcSesSelectField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Tikslas"
          placeholder="Pasirinkite"
          :searchable="true"
          :multiple="true"
          name="tikslas"
          :items="[
            {
              title: 'Tikslas 1',
              value: 't1',
              subtitle:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            { title: 'Tikslas 2', value: 't2' },
            { title: 'Tikslas 3', value: 't3' },
            {
              title: 'Tikslas 4',
              value: 't4',
              subtitle:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            { title: 'Tikslas 5', value: 't5' },
            { title: 'Tikslas 6', value: 't6' },
          ]"
        />
      </Field>

      <Field v-slot="fieldProps" name="telefonas">
        <RcSesPhoneField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Telefono Nr."
          class="form-control"
          default-iso="lt"
          name="telefonas"
        />
      </Field>

      <Field v-slot="fieldProps" name="ieskoti">
        <RcSesSearchableField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Ieškoti"
          class="form-control"
          :modal-component="SearchModal"
          name="ieskoti"
        />
      </Field>

      <Field v-slot="fieldProps" name="data">
        <RcSesDatePickerField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Data"
          class="form-control"
          :max-width="150"
          placeholder="Data"
          name="data"
        />
      </Field>

      <Field v-slot="fieldProps" name="laikotarpis">
        <RcSesDatePickerField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Laikotarpis"
          name="laikotarpis"
          class="form-control"
          range
          :max-width="300"
          placeholder="Pradžia  →  Pabaiga"
        />
      </Field>

      <Field v-slot="fieldProps" name="skaicius">
        <RcSesNumberStepperField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Skaičius"
          :max-width="300"
          name="skaicius"
        />
      </Field>

      <Field v-slot="fieldProps" name="sutikimas">
        <RcSesCheckboxField
          :model-value="fieldProps.field.value"
          :error="fieldProps.errorMessage"
          name="sutikimas"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          field-label="Sutikimas"
          @update:model-value="fieldProps.handleChange"
        />
      </Field>

      <v-divider class="form-control" />

      <Field v-slot="fieldProps" name="pavadinimas">
        <RcSesTextField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Pavadinimas"
          name="pavadinimas"
          placeholder="Pavadinimas"
        />
      </Field>

      <Field v-slot="fieldProps" name="radioPasirinkimas">
        <RcSesRadioField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Pasirinkimas"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          class="bg-grey-100"
          :options="[
            { value: 'p1', label: 'Pasirinkimas #1' },
            { value: 'p2', label: 'Pasirinkimas #2' },
            { value: 'p3', label: 'Pasirinkimas #3' },
            { value: 'p4', label: 'Pasirinkimas #4' },
            { value: 'p5', label: 'Labai ilgas pasirinkimas #5' },
          ]"
          name="radioPasirinkimas"
        />
      </Field>

      <Field v-slot="fieldProps" name="radioButtonsPasirinkimas">
        <RcSesRadioButtonsField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          field-label="Pasirinkimas"
          :options="[
            { value: 'p1', label: 'Pasirinkimas #1' },
            { value: 'p2', label: 'Pasirinkimas #2' },
            { value: 'p3', label: 'Pasirinkimas #3' },
            { value: 'p4', label: 'Pasirinkimas #4' },
            { value: 'p5', label: 'Labai ilgas pasirinkimas #5' },
          ]"
          name="radioButtonsPasirinkimas"
        />
      </Field>

      <Field v-slot="fieldProps" name="files">
        <RcSesFileDropzoneField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Įkelti dokumentus"
          name="files"
          multiple
        />
      </Field>

      <div class="d-flex justify-end mt-5">
        <v-btn type="submit" color="primary">Submit</v-btn>
      </div>
    </form>
  </VeeForm>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { Field, Form as VeeForm, useForm } from 'vee-validate'
import * as yup from 'yup'

import RcSesCheckboxField from '@/components/common/inputs/Checkboxes/CheckboxField/RcSesCheckboxField.vue'
import RcSesDatePickerField from '@/components/common/inputs/Datepickers/DatePickerField/RcSesDatePickerField.vue'
import RcSesFileDropzoneField from '@/components/common/inputs/FileDropzones/FileDropzoneField/RcSesFileDropzoneField.vue'
import RcSesNumberStepperField from '@/components/common/inputs/NumberSteppers/NumberStepperField/RcSesNumberStepperField.vue'
import RcSesPhoneField from '@/components/common/inputs/PhoneField/RcSesPhoneField.vue'
import RcSesRadioButtonsField from '@/components/common/inputs/RadioButtonsField/RcSesRadioButtonsField.vue'
import RcSesRadioField from '@/components/common/inputs/Radios/RadioFields/RcSesRadioField.vue'
import RcSesSearchableField from '@/components/common/inputs/SearchableField/RcSesSearchableField.vue'
import RcSesSelectField from '@/components/common/inputs/SelectField/RcSesSelectField.vue'
import RcSesTextField from '@/components/common/inputs/TextField/RcSesTextField.vue'
import SearchModal from '@/examples/modals/SearchModal.vue'

const FormSchema = yup.object({
  trumpas_tekstas: yup.string().required().max(10),
  ilgas_tekstas: yup.string().required().max(300),
  tikslas: yup.array().required().min(1),
  telefonas: yup.object().required(),
  ieskoti: yup.string().required(),
  data: yup.string().required(),
  laikotarpis: yup.array().required().length(2),
  skaicius: yup.number().required().min(2),
  sutikimas: yup.boolean().required(),
  pavadinimas: yup.string().required(),
  radioPasirinkimas: yup.string().required(),
  radioButtonsPasirinkimas: yup.string().required(),
  // files: yup.array().required().min(1, 'Bent vienas failas yra privalomas'),
})

useForm({
  validationSchema: toTypedSchema(FormSchema),
})

function onSubmit(values) {
  // Submit values to API...
  // eslint-disable-next-line no-console
  console.log(values)
}
</script>
