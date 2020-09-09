import { IComponentTheme } from '../../../styles/theme/types';

export interface ITextEditorProps extends IComponentTheme {
    className: any;
    inputVal?: string;
    onChangeHandler(data: string): void;
}