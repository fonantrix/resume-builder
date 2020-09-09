import { IComponentTheme } from '../../../styles/theme/types';


export interface ITemplateProps {
    imageUrl: string;
    author: string;
    templateCost: string;
    templateCurrency: string;
    id: number;
    selectHandler(id: number): void;
    previewHandler(): void;
}

export interface ITemplateComponentProps extends IComponentTheme, ITemplateProps {
    className: any;
    imageUrl: string;
}