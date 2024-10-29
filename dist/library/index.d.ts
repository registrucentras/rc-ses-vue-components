import { Plugin } from 'vue';
import { default as RcSesAccordion } from '../components/common/Accordion/RcSesAccordion.vue';
import { default as RcSesAlert } from '../components/common/Alert/RcSesAlert.vue';
import { default as RcSesError } from '../components/common/Error/RcSesError.vue';
import { default as RcSesButton } from '../components/common/buttons/Button/RcSesButton.vue';
import { default as RcSesFormControl } from '../components/common/forms/RcSesFormControl.vue';
import { default as RcSesCheckbox } from '../components/common/inputs/Checkboxes/Checkbox/RcSesCheckbox.vue';
import { default as RcSesCheckboxField } from '../components/common/inputs/Checkboxes/CheckboxField/RcSesCheckboxField.vue';
import { default as RcSesDatePicker } from '../components/common/inputs/Datepickers/DatePicker/RcSesDatePicker.vue';
import { default as RcSesDatePickerField } from '../components/common/inputs/Datepickers/DatePickerField/RcSesDatePickerField.vue';
import { default as RcSesFieldWrapper } from '../components/common/inputs/FieldWrapper/RcSesFieldWrapper.vue';
import { default as RcSesFileDropzone } from '../components/common/inputs/FileDropzones/FileDropzone/RcSesFileDropzone.vue';
import { default as RcSesFileDropzoneField } from '../components/common/inputs/FileDropzones/FileDropzoneField/RcSesFileDropzoneField.vue';
import { default as RcSesFileInput } from '../components/common/inputs/FileInputs/FileInput/RcSesFileInput.vue';
import { default as RcSesFileInputField } from '../components/common/inputs/FileInputs/FileInputField/RcSesFileInputField.vue';
import { default as RcSesNumberStepper } from '../components/common/inputs/NumberSteppers/NumberStepper/RcSesNumberStepper.vue';
import { default as RcSesNumberStepperField } from '../components/common/inputs/NumberSteppers/NumberStepperField/RcSesNumberStepperField.vue';
import { default as RcSesPhoneField } from '../components/common/inputs/PhoneField/RcSesPhoneField.vue';
import { default as RcSesRadioButtonsField } from '../components/common/inputs/RadioButtonsField/RcSesRadioButtonsField.vue';
import { default as RcSesRadio } from '../components/common/inputs/Radios/Radio/RcSesRadio.vue';
import { default as RcSesRadioField } from '../components/common/inputs/Radios/RadioFields/RcSesRadioField.vue';
import { default as RcSesSearchField } from '../components/common/inputs/SearchField/RcSesSearchField.vue';
import { default as RcSesSearchableArea } from '../components/common/inputs/SearchableArea/RcSesSearchableArea.vue';
import { default as RcSesSearchableField } from '../components/common/inputs/SearchableField/RcSesSearchableField.vue';
import { default as RcSesSelectField } from '../components/common/inputs/SelectField/RcSesSelectField.vue';
import { default as RcSesTextareaField } from '../components/common/inputs/TextAreaField/RcSesTextAreaField.vue';
import { default as RcSesTextField } from '../components/common/inputs/TextField/RcSesTextField.vue';
import { default as RcSesTable } from '../components/common/tables/table/RcSesTable.vue';
import { default as RcSesTab } from '../components/common/tabs/RcSesTab.vue';
import { default as RcSesTooltip } from '../components/common/tooltip/RcSesTooltip.vue';
import { default as RcSesFormActions } from '../components/layouts/FormActions/RcSesFormActions.vue';
import { default as RcSesFormContainer } from '../components/layouts/FormContainer/RcSesFormContainer.vue';
import { default as RcSesFormStepper } from '../components/layouts/FormStepper/RcSesFormStepper.vue';
import { default as RcSesFormTabContainer } from '../components/layouts/FormTabContainer/RcSesFormTabContainer.vue';
import { default as RcSesHeader } from '../components/layouts/Header/RcSesHeader.vue';
import { default as createRcSesVuetify } from '../plugins/vuetify';

export declare const globalOptions: unique symbol;
export declare function createRcSesComponents(options?: object): Plugin<[]>;
export { createRcSesVuetify };
export { RcSesHeader, RcSesFieldWrapper, RcSesFormContainer, RcSesFormTabContainer, RcSesFormStepper, RcSesFormActions, };
export { RcSesAlert, RcSesButton };
export { RcSesCheckbox, RcSesCheckboxField };
export { RcSesFileInput, RcSesFileInputField };
export { RcSesDatePicker, RcSesDatePickerField };
export { RcSesNumberStepper, RcSesNumberStepperField };
export { RcSesPhoneField };
export { RcSesRadio, RcSesRadioButtonsField, RcSesRadioField };
export { RcSesSearchableArea, RcSesSelectField, RcSesSearchField };
export { RcSesTextField, RcSesTextareaField };
export { RcSesAccordion };
export { RcSesError, RcSesFormControl };
export { RcSesFileDropzone, RcSesFileDropzoneField };
export { RcSesSearchableField };
export { RcSesTable };
export { RcSesTab };
export { RcSesTooltip };
