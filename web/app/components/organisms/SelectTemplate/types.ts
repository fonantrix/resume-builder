import { IComponentTheme } from '../../../styles/theme/types';
import { ITemplate } from '../../templates/Dashboard/types';

export interface ISelectTemplateProps extends IComponentTheme {
    className?: any;
    data: Array<ITemplate>;
    selectHandler(id: number): void;
    previewHandler(): void;
}