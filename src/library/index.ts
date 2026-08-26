import type { App, Plugin } from 'vue'
import 'vuetify/styles'

import RcSesAccordion from '@/components/common/Accordion/RcSesAccordion.vue'
import useAccordionController from '@/components/common/Accordion/hooks/useAccordionController'
import RcSesAdvancedListItemV2 from '@/components/common/AdvancedListItemV2/RcSesAdvancedListItemV2.vue'
import RcSesAdvancedListV2 from '@/components/common/AdvancedListV2/RcSesAdvancedListV2.vue'
import RcSesAlert from '@/components/common/Alert/RcSesAlert.vue'
import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import RcSesCardFooterV2 from '@/components/common/CardV2/RcSesCardFooterV2.vue'
import RcSesCardV2 from '@/components/common/CardV2/RcSesCardV2.vue'
import RcSesChipSelectV2 from '@/components/common/ChipSelectV2/RcSesChipSelectV2.vue'
import RcSesDatePickerV2 from '@/components/common/DatePickerV2/RcSesDatePickerV2.vue'
import RcSesDropdownV2 from '@/components/common/DropdownV2/RcSesDropdownV2.vue'
import RcSesError from '@/components/common/Error/RcSesError.vue'
import RcSesErrorSummaryV2 from '@/components/common/ErrorSummaryV2/RcSesErrorSummaryV2.vue'
import RcSesFilterDropdownV2 from '@/components/common/FilterDropdownV2/RcSesFilterDropdownV2.vue'
import RcSesFiltersV2 from '@/components/common/FiltersV2/RcSesFiltersV2.vue'
import RcSesFullPageLoaderV2 from '@/components/common/FullPageLoaderV2/RcSesFullPageLoaderV2.vue'
import RcSesImageAndTextV2 from '@/components/common/ImageAndTextV2/RcSesImageAndTextV2.vue'
import RcSesInlineAlertV2 from '@/components/common/InlineAlertV2/RcSesInlineAlertV2.vue'
import RcSesLoaderV2 from '@/components/common/LoaderV2/RcSesLoaderV2.vue'
import RcSesReviewCardV2 from '@/components/common/ReviewCardV2/RcSesReviewCardV2.vue'
import RcSesSnackbarV2 from '@/components/common/SnackbarV2/RcSesSnackbarV2.vue'
import RcSesStepperV2 from '@/components/common/StepperV2/RcSesStepperV2.vue'
import RcSesSubcardV2 from '@/components/common/SubcardV2/RcSesSubcardV2.vue'
import RcSesTooltipV2 from '@/components/common/TooltipV2/RcSesTooltipV2.vue'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesButton from '@/components/common/buttons/Button/RcSesButton.vue'
import RcSesFormControl from '@/components/common/forms/RcSesFormControl.vue'
import RcSesCheckbox from '@/components/common/inputs/Checkboxes/Checkbox/RcSesCheckbox.vue'
import RcSesCheckboxField from '@/components/common/inputs/Checkboxes/CheckboxField/RcSesCheckboxField.vue'
import RcSesCheckboxSelectableAreaV2 from '@/components/common/inputs/Checkboxes/CheckboxSelectableAreaV2/RcSesCheckboxSelectableAreaV2.vue'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesDatePicker from '@/components/common/inputs/Datepickers/DatePicker/RcSesDatePicker.vue'
import RcSesDatePickerField from '@/components/common/inputs/Datepickers/DatePickerField/RcSesDatePickerField.vue'
import RcSesFieldWrapper from '@/components/common/inputs/FieldWrapper/RcSesFieldWrapper.vue'
import RcSesFileDropzone from '@/components/common/inputs/FileDropzones/FileDropzone/RcSesFileDropzone.vue'
import RcSesFileDropzoneField from '@/components/common/inputs/FileDropzones/FileDropzoneField/RcSesFileDropzoneField.vue'
import RcSesFileInput from '@/components/common/inputs/FileInputs/FileInput/RcSesFileInput.vue'
import RcSesFileInputField from '@/components/common/inputs/FileInputs/FileInputField/RcSesFileInputField.vue'
import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'
import RcSesNumberStepper from '@/components/common/inputs/NumberSteppers/NumberStepper/RcSesNumberStepper.vue'
import RcSesNumberStepperField from '@/components/common/inputs/NumberSteppers/NumberStepperField/RcSesNumberStepperField.vue'
import RcSesPhoneField from '@/components/common/inputs/PhoneField/RcSesPhoneField.vue'
import RcSesRadioButtonsField from '@/components/common/inputs/RadioButtonsField/RcSesRadioButtonsField.vue'
import RcSesRadio from '@/components/common/inputs/Radios/Radio/RcSesRadio.vue'
import RcSesRadioField from '@/components/common/inputs/Radios/RadioFields/RcSesRadioField.vue'
import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import RcSesRadioSelectableAreaV2 from '@/components/common/inputs/Radios/RadioSelectableAreaV2/RcSesRadioSelectableAreaV2.vue'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'
import RcSesSearchField from '@/components/common/inputs/SearchField/RcSesSearchField.vue'
import RcSesSearchableArea from '@/components/common/inputs/SearchableArea/RcSesSearchableArea.vue'
import RcSesSearchableField from '@/components/common/inputs/SearchableField/RcSesSearchableField.vue'
import RcSesSelectField from '@/components/common/inputs/SelectField/RcSesSelectField.vue'
import RcSesTextAreaField from '@/components/common/inputs/TextAreaField/RcSesTextAreaField.vue'
import RcSesTextField from '@/components/common/inputs/TextField/RcSesTextField.vue'
import RcSesTimePickerField from '@/components/common/inputs/TimePickerField/RcSesTimePickerField.vue'
import RcSesTable from '@/components/common/tables/table/RcSesTable.vue'
import RcSesTab from '@/components/common/tabs/RcSesTab.vue'
import RcSesToggleV2 from '@/components/common/toggleV2/RcSesToggleV2.vue'
import RcSesTooltip from '@/components/common/tooltip/RcSesTooltip.vue'
import RcSesCardFormContainerV2 from '@/components/layouts/CardFormContainerV2/RcSesCardFormContainerV2.vue'
import RcSesFormActions from '@/components/layouts/FormActions/RcSesFormActions.vue'
import RcSesFormContainer from '@/components/layouts/FormContainer/RcSesFormContainer.vue'
import RcSesFormStepper from '@/components/layouts/FormStepper/RcSesFormStepper.vue'
import RcSesFormTabContainer from '@/components/layouts/FormTabContainer/RcSesFormTabContainer.vue'
import RcSesHeader from '@/components/layouts/Header/RcSesHeader.vue'
import RcSesBackdropV2 from '@/components/overlays/BackdropV2/RcSesBackdropV2.vue'
import RcSesModalV2 from '@/components/overlays/ModalV2/RcSesModalV2.vue'
import initI18n from '@/plugins/i18n'
import createRcSesVuetify from '@/plugins/vuetify'
import '@/styles/shared/index.scss'
import type UseFormType from '@/types/forms/UseFormType'

// eslint-disable-next-line symbol-description
export const globalOptions = Symbol()

export function createRcSesComponents(options: object = {}): Plugin<[]> {
  const install = (app: App) => {
    initI18n()

    app.provide(globalOptions, options)

    // Layout components
    app
      .component('RcSesHeader', RcSesHeader)
      .component('RcSesFieldWrapper', RcSesFieldWrapper)
      .component('RcSesFormContainer', RcSesFormContainer)
      .component('RcSesTabFormContainer', RcSesFormTabContainer)
      .component('RcSesFormStepper', RcSesFormStepper)
      .component('RcSesFormActions', RcSesFormActions)
      .component('RcSesCardFormContainerV2', RcSesCardFormContainerV2)

    app.component('RcSesAccordion', RcSesAccordion)

    app
      .component('RcSesError', RcSesError)
      .component('RcSesFormControl', RcSesFormControl)

    app.component('RcSesAlert', RcSesAlert)

    // eslint-disable-next-line vue/no-reserved-component-names
    app.component('RcSesButton', RcSesButton)
    app.component('RcSesButtonV2', RcSesButtonV2)
    app.component('RcSesToggleV2', RcSesToggleV2)

    app.component('RcSesCheckbox', RcSesCheckbox)

    app.component('RcSesCheckboxField', RcSesCheckboxField)

    app
      .component('RcSesDatePicker', RcSesDatePicker)
      .component('RcSesDatePickerField', RcSesDatePickerField)

    app.component('RcSesTimePickerField', RcSesTimePickerField)

    app
      .component('RcSesFileInput', RcSesFileInput)
      .component('RcSesFileInputField', RcSesFileInputField)

    app
      .component('RcSesFileDropzone', RcSesFileDropzone)
      .component('RcSesFileDropzoneField', RcSesFileDropzoneField)

    app
      .component('RcSesNumberStepper', RcSesNumberStepper)
      .component('RcSesNumberStepperField', RcSesNumberStepperField)

    app.component('RcSesPhoneField', RcSesPhoneField)

    app
      .component('RcSesRadio', RcSesRadio)
      .component('RcSesRadioField', RcSesRadioField)
      .component('RcSesRadioButtonsField', RcSesRadioButtonsField)
      .component('RcSesRadioGroupV2', RcSesRadioGroupV2)
      .component('RcSesRadioV2', RcSesRadioV2)
      .component('RcSesRadioSelectableAreaV2', RcSesRadioSelectableAreaV2)

    app
      .component('RcSesSearchableArea', RcSesSearchableArea)
      .component('RcSesSearchField', RcSesSearchField)
      .component('RcSesSearchableField', RcSesSearchableField)

    app.component('RcSesSelectField', RcSesSelectField)

    app.component('RcSesTextField', RcSesTextField)
    app.component('RcSesInputV2', RcSesInputV2)
    app.component('RcSesDropdownV2', RcSesDropdownV2)
    app.component('RcSesDatePickerV2', RcSesDatePickerV2)
    app.component('RcSesTextAreaField', RcSesTextAreaField)

    app.component('RcSesTable', RcSesTable)
    app.component('RcSesTab', RcSesTab)
    app.component('RcSesTooltip', RcSesTooltip)
    app.component('RcSesTooltipV2', RcSesTooltipV2)

    app.component('RcSesBadgeV2', RcSesBadgeV2)
    app.component('RcSesAdvancedListV2', RcSesAdvancedListV2)
    app.component('RcSesAdvancedListItemV2', RcSesAdvancedListItemV2)
    app.component('RcSesChipSelectV2', RcSesChipSelectV2)
    app.component('RcSesFilterDropdownV2', RcSesFilterDropdownV2)
    app.component('RcSesFiltersV2', RcSesFiltersV2)
    app.component('RcSesCheckboxV2', RcSesCheckboxV2)
    app.component('RcSesCheckboxSelectableAreaV2', RcSesCheckboxSelectableAreaV2)
    app.component('RcSesImageAndTextV2', RcSesImageAndTextV2)
    app.component('RcSesSnackbarV2', RcSesSnackbarV2)
    app.component('RcSesInlineAlertV2', RcSesInlineAlertV2)
    app.component('RcSesErrorSummaryV2', RcSesErrorSummaryV2)
    app.component('RcSesLoaderV2', RcSesLoaderV2)
    app.component('RcSesFullPageLoaderV2', RcSesFullPageLoaderV2)
    app.component('RcSesStepperV2', RcSesStepperV2)
    app.component('RcSesCardV2', RcSesCardV2)
    app.component('RcSesCardFooterV2', RcSesCardFooterV2)
    app.component('RcSesSubcardV2', RcSesSubcardV2)
    app.component('RcSesReviewCardV2', RcSesReviewCardV2)
    app.component('RcSesModalV2', RcSesModalV2)
    app.component('RcSesBackdropV2', RcSesBackdropV2)
  }

  return { install }
}

export { createRcSesVuetify }

export {
  RcSesHeader,
  RcSesFieldWrapper,
  RcSesFormContainer,
  RcSesFormTabContainer,
  RcSesFormStepper,
  RcSesFormActions,
  RcSesCardFormContainerV2,
}

export { RcSesAlert, RcSesButton }
export { RcSesBadgeV2, RcSesButtonV2, RcSesToggleV2 }
export { RcSesAdvancedListV2, RcSesAdvancedListItemV2 }
export { RcSesRadioGroupV2, RcSesRadioV2, RcSesRadioSelectableAreaV2 }
export { RcSesImageAndTextV2, RcSesSnackbarV2 }
export { RcSesInlineAlertV2, RcSesErrorSummaryV2, RcSesStepperV2 }
export { RcSesCheckboxV2, RcSesCheckboxSelectableAreaV2 }
export { RcSesChipSelectV2 }
export { RcSesFilterDropdownV2, RcSesFiltersV2 }
export { RcSesLoaderV2, RcSesFullPageLoaderV2 }
export { RcSesModalV2, RcSesBackdropV2 }
export { RcSesCardV2, RcSesCardFooterV2, RcSesReviewCardV2, RcSesSubcardV2 }
export { RcSesCheckbox, RcSesCheckboxField }
export { RcSesFileInput, RcSesFileInputField }
export { RcSesDatePicker, RcSesDatePickerField, RcSesTimePickerField }
export { RcSesNumberStepper, RcSesNumberStepperField }
export { RcSesPhoneField }
export { RcSesRadio, RcSesRadioButtonsField, RcSesRadioField }
export { RcSesSearchableArea, RcSesSelectField, RcSesSearchField }
export { RcSesTextField, RcSesTextAreaField }
export { RcSesInputV2, RcSesDropdownV2, RcSesDatePickerV2 }
export { RcSesAccordion, useAccordionController }
export { RcSesError, RcSesFormControl }
export { RcSesFileDropzone, RcSesFileDropzoneField }
export { RcSesSearchableField }
export { RcSesTable }
export { RcSesTab }
export { RcSesTooltip, RcSesTooltipV2 }
export type { UseFormType }

export * from '@/assets/icons/regular'
export * from '@/assets/icons/filled'
export * from '@/assets/icons/bold'
