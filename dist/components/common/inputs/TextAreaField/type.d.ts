import { VTextarea } from 'vuetify/components';
import { FieldProps, InputProps } from '../../../../types/inputs/FieldProps';

export type TextAreaFieldProps = FieldProps & InputProps & {
    active?: VTextarea['$props']['active'];
    appendIcon?: VTextarea['$props']['appendIcon'];
    appendInnerIcon?: VTextarea['$props']['appendInnerIcon'];
    autofocus?: VTextarea['$props']['autofocus'];
    baseColor?: VTextarea['$props']['baseColor'];
    autoGrow?: VTextarea['$props']['autoGrow'];
    bgColor?: VTextarea['$props']['bgColor'];
    centerAffix?: VTextarea['$props']['centerAffix'];
    clearable?: VTextarea['$props']['clearable'];
    clearIcon?: VTextarea['$props']['clearIcon'];
    counter?: VTextarea['$props']['counter'];
    counterValue?: VTextarea['$props']['counterValue'];
    density?: VTextarea['$props']['density'];
    direction?: VTextarea['$props']['direction'];
    dirty?: VTextarea['$props']['dirty'];
    flat?: VTextarea['$props']['flat'];
    focused?: VTextarea['$props']['focused'];
    hideSpinButtons?: VTextarea['$props']['hideSpinButtons'];
    hint?: VTextarea['$props']['hint'];
    id?: VTextarea['$props']['id'];
    loading?: VTextarea['$props']['loading'];
    maxErrors?: VTextarea['$props']['maxErrors'];
    maxWidth?: VTextarea['$props']['maxWidth'];
    maxRows?: VTextarea['$props']['maxRows'];
    messages?: VTextarea['$props']['messages'];
    minWidth?: VTextarea['$props']['minWidth'];
    persistentClear?: VTextarea['$props']['persistentClear'];
    persistentCounter?: VTextarea['$props']['persistentCounter'];
    persistentHint?: VTextarea['$props']['persistentHint'];
    persistentPlaceholder?: VTextarea['$props']['persistentPlaceholder'];
    prefix?: VTextarea['$props']['prefix'];
    prependIcon?: VTextarea['$props']['prependIcon'];
    prependInnerIcon?: VTextarea['$props']['prependInnerIcon'];
    readonly?: VTextarea['$props']['readonly'];
    reverse?: VTextarea['$props']['reverse'];
    rows?: VTextarea['$props']['rows'];
    singleLine?: VTextarea['$props']['singleLine'];
    suffix?: VTextarea['$props']['suffix'];
    theme?: VTextarea['$props']['theme'];
    tile?: VTextarea['$props']['tile'];
    validateOn?: VTextarea['$props']['validateOn'];
    validationValue?: VTextarea['$props']['validationValue'];
    width?: VTextarea['$props']['width'];
    value?: any;
};
