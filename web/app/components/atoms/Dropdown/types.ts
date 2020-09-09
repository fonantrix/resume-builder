import { IComponentTheme } from '../../../styles/theme/types';

export interface IDropdownProps extends IComponentTheme, React.HTMLProps<HTMLSelectElement> {
    type: any;
    className: any;
    multiSelect?: boolean;
    options: Array<IOption>;
    disabled?: boolean;
    errorMessage?: string;
    initialSelected: Array<IOption>;
    haserror?: boolean;
    defaultValue?: string;
    selectedOptions(data: any): void;
}

export interface IOption {
    name: string;
    value: string;
    isSelected?: boolean;
}