import { IComponentTheme } from '../../../styles/theme/types';

export interface IButtonProps {
    labelText: string;
    btnStyle?: string;
}

export interface IButtonComponentProps extends IButtonProps, IComponentTheme, React.HTMLProps<HTMLButtonElement> {
    className: any;
    onClick(): void;
}