<template>
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="FormSchema" as="div">
    <form @submit="handleSubmit($event, onSubmit)">
      <Field v-slot="fieldProps" name="trumpas">
        <RcSesTextField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Trumpas tekstas"
          field-description="lorem ipsum."
          name="trumpas"
          placeholder="Tekstas"
          messages="Lorem Ipsum is simply dummy text."
          counter="10"
          required
        ></RcSesTextField>
      </Field>

      <Field v-slot="fieldProps" name="ilgas">
        <RcSesTextAreaField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          :rows="2"
          :field-tooltip-on-click="true"
          field-tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          field-label="Ilgas tekstas"
          field-description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          name="ilgas"
          placeholder="Tekstas"
          messages="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          counter="300"
          required
        ></RcSesTextAreaField>
      </Field>

      <Field v-slot="fieldProps" name="tikslas">
        <RcSesSelectField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          name="tikslas"
          class="form-control"
          field-label="Tikslas"
          placeholder="Pasirinkite"
          :searchable="true"
          :multiple="true"
          required
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
          :vee-field="fieldProps"
          field-label="Telefono Nr."
          class="form-control"
          default-iso="lt"
          name="telefonas"
          required
        />
      </Field>

      <Field v-slot="fieldProps" name="ieskoti">
        <RcSesSearchableField
          field-tooltip-title="Tolltip title"
          field-tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Ieškoti"
          class="form-control"
          :modal-component="SearchModal"
          name="ieskoti"
          required
        />
      </Field>

      <Field v-slot="fieldProps" name="data">
        <RcSesDatePickerField
          :vee-field="fieldProps"
          field-label="Data"
          class="form-control"
          placeholder="Data"
          name="data"
          required
          :max-width="250"
        />
      </Field>

      <Field v-slot="fieldProps" name="laikotarpis">
        <RcSesDatePickerField
          :vee-field="fieldProps"
          field-label="Laikotarpis"
          class="form-control"
          range
          placeholder="Pradžia  →  Pabaiga"
          name="laikotarpis"
          required
          :max-width="350"
          :input-props="{
            counter: 10,
          }"
          :input-events="{
            click: () => console.log('clicked'),
            focus: () => console.log('focused'),
          }"
        >
          <template #append-inner>
            <RcSesTooltip
              title="Tooltip title"
              description="Tooltip description"
            ></RcSesTooltip>
          </template>
        </RcSesDatePickerField>
      </Field>

      <Field v-slot="fieldProps" name="laikas">
        <RcSesTimepickerField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Laikas"
          class="form-control"
          :max-width="300"
          placeholder="Pasirinkite laiką"
          name="laikas"
          required
        />
      </Field>

      <Field v-slot="fieldProps" name="skaicius">
        <RcSesNumberStepperField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Skaičius"
          field-tooltip-title="Tolltip title"
          field-tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          :max-width="300"
          name="skaicius"
          required
        />
      </Field>

      <Field v-slot="fieldProps" name="sutikimas">
        <RcSesCheckboxField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          field-label="Sutikimas"
          name="sutikimas"
          required
        />
      </Field>

      <Field v-slot="fieldProps" name="sutikimasTooltip">
        <RcSesCheckboxField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          field-label="Sutikimas + tooltip"
          name="sutikimasTooltip"
          :true-value="'taip'"
          :false-value="'ne'"
          required
        >
          <template #label="labelProps">
            <span v-bind="labelProps">{{ labelProps.label }}</span>
            <RcSesTooltip
              title="Tooltip title"
              description="Tooltip description"
            ></RcSesTooltip>
          </template>
        </RcSesCheckboxField>
      </Field>

      <Field v-slot="fieldProps" name="pavadinimas">
        <RcSesTextField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          class="form-control"
          field-label="Pavadinimas"
          name="pavadinimas"
          placeholder="Pavadinimas"
        >
          <template #append>
            <RcSesTooltip
              title="Tooltip title"
              description="Tooltip description"
            ></RcSesTooltip>
          </template>
        </RcSesTextField>
      </Field>

      <Field v-slot="fieldProps" name="radioPasirinkimas">
        <RcSesRadioField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Pasirinkimas"
          :field-wrapper-props="{
            class: 'form-control',
          }"
          class="bg-grey-100 pa-2"
          name="radioPasirinkimas"
          :options="[
            { value: 'p1', label: 'Pasirinkimas #1' },
            { value: 'p2', label: 'Pasirinkimas #2' },
            { value: 'p3', label: 'Pasirinkimas #3' },
            { value: 'p4', label: 'Pasirinkimas #4' },
            { value: 'p5', label: 'Labai ilgas pasirinkimas #5' },
          ]"
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
          class="pa-2"
          name="radioPasirinkimas"
          required
          :options="[
            { value: 'p1', label: 'Pasirinkimas #1' },
            { value: 'p2', label: 'Pasirinkimas #2' },
            { value: 'p3', label: 'Pasirinkimas #3' },
            { value: 'p4', label: 'Pasirinkimas #4' },
            { value: 'p5', label: 'Labai ilgas pasirinkimas #5' },
          ]"
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
          name="radioButtonsPasirinkimas"
          required
          :options="[
            { value: 'p1', label: 'Pasirinkimas #1' },
            { value: 'p2', label: 'Pasirinkimas #2' },
            { value: 'p3', label: 'Pasirinkimas #3' },
            { value: 'p4', label: 'Pasirinkimas #4' },
            { value: 'p5', label: 'Labai ilgas pasirinkimas #5' },
          ]"
        />
      </Field>
      <Field v-slot="fieldProps" name="files">
        <RcSesFileDropzoneField
          v-bind="fieldProps.field"
          :error="fieldProps.errorMessage"
          field-label="Įkelti dokumentus"
          field-description="Tinkami formatai: .doc, .xdoc, .pdf, .pages"
          required
          name="files"
          multiple
          accept="image/*"
          content-description="Maksumalus failo dydis:"
          :max-files="3"
          :on-drop="onDrop"
          :on-drag-enter="() => console.log('drag enter')"
          :on-drag-leave="() => console.log('drag leave')"
          :on-drag-over="() => console.log('drag over')"
          :on-drop-rejected="() => console.log('drop rejected')"
          :on-drop-accepted="() => console.log('drop accepted')"
          :prevent-drop-on-document="true"
          :no-click="false"
          :no-keyboard="false"
          :no-drag="false"
          :no-drag-events-bubbling="false"
        >
          <template #content-description="{ contentDescription }">
            {{ contentDescription }}
            <span class="text-error">5MB</span>
            <br />
            <span class="text-error">Maksimalus failų skaičius: 3</span>
          </template>
        </RcSesFileDropzoneField>
      </Field>
      <div class="d-flex justify-end mt-5">
        <v-btn type="submit" color="primary">Submit</v-btn>
      </div>
    </form>
  </VeeForm>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { Field, Form as VeeForm, configure, useForm } from 'vee-validate'
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
import RcSesTextAreaField from '@/components/common/inputs/TextAreaField/RcSesTextAreaField.vue'
import RcSesTextField from '@/components/common/inputs/TextField/RcSesTextField.vue'
import RcSesTimepickerField from '@/components/common/inputs/TimePickerField/RcSesTimePickerField.vue'
import RcSesTooltip from '@/components/common/tooltip/RcSesTooltip.vue'
import SearchModal from '@/examples/modals/SearchModal.vue'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
})

const FormSchema = yup.object({
  trumpas: yup
    .string()
    .required('Trumpas tekstas yra privalomas')
    .max(10, 'Tekstas negali būti ilgesnis nei 10 simbolių'),
  ilgas: yup
    .string()
    .required('Ilgas tekstas yra privalomas')
    .max(300, 'Tekstas negali būti ilgesnis nei 300 simbolių'),
  tikslas: yup
    .array()
    .required('Tikslas yra privalomas')
    .min(1, 'Pasirinkite bent vieną tikslą'),
  telefonas: yup
    .object()
    .shape({
      country: yup.object().required('Šalis yra privaloma'),
      value: yup.string().required('Telefono numeris yra privalomas'),
    })
    .required('Telefono informacija yra privaloma'),
  ieskoti: yup.string().required('Paieškos laukas yra privalomas'),
  data: yup.string().required('Data yra privaloma'),
  sutikimas: yup
    .boolean()
    .required('Sutikimas yra privalomas')
    .oneOf([true], 'Turite duoti sutikimą'),
  sutikimasTooltip: yup
    .string()
    .required('Sutikimas yra privalomas')
    .oneOf(['taip'], 'Sutikimas yra privalomas'),
  laikotarpis: yup
    .array()
    .required('Laikotarpis yra privalomas')
    .length(2, 'Pasirinkite pradžios ir pabaigos datas'),
  laikas: yup.string().required('Laikas yra privalomas'),
  skaicius: yup
    .number()
    .required('Skaičius yra privalomas')
    .min(5, 'Skaičius turi būti didesnis arba lygus 5'),
  radioPasirinkimas: yup.string().required('Pasirinkimas yra privalomas'),
  radioButtonsPasirinkimas: yup.string().required('Pasirinkimas yra privalomas'),
  files: yup.array().required('Failai yra privalomi').min(3, 'Įkelkite bent 3 failus'),
})

useForm({
  validationSchema: toTypedSchema(FormSchema),
  validateOnMount: false,
})

function onSubmit(values) {
  // eslint-disable-next-line no-console
  console.log('Form submitted with values:', values)
}

function onDrop(files) {
  // eslint-disable-next-line no-console
  console.log('Files dropped:', files)
}
</script>
