import { IComponentTheme } from '../../../styles/theme/types';

export interface IInputProps extends IComponentTheme, React.HTMLProps<HTMLInputElement> {
    type: any;
    maxLength?: number;
    placeholder?: string;
    className: any;
    inputVal: string;  
    readOnly?: boolean;
    errorMessage?: string;
    onChangeHandler(value: string): void;
}