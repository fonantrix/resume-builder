import { IComponentTheme } from '../../../styles/theme/types';
import { FormFields } from '../../../global/types';

export interface IFormProps {
    formFields: FormFields;
    heading?: string;
    initailValues?: any;
    buttonText?: string;
    isFileUpload?: boolean;
    showSubmitBtn?: boolean;
    formHeader?: IFormHeader | null;
    imageUrl?: string;
    formRef?: React.RefObject<HTMLFormElement>;
    submitVisibility?: string;
    onSubmit?(formFieldsValue: any): any;
    fileUpload?: (file: File) => void;
}

export interface IFormComponentProps extends IFormProps, IComponentTheme {
    className: any;
}

export interface IFormHeader {
    centerText: string;
    leftContent?: any;
    rightContent?: any;
}