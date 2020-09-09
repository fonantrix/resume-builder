import { IAction, FormFields, IApiErrorResponse } from '../../../global/types';
import { IComponentTheme, IComponentProps } from '../../../styles/theme/types';

export interface IDashboardProps extends IComponentTheme, IComponentProps {
    loader: boolean;
    className: any;
    template: Array<ITemplate>;
    getTemplates(): void 
}

export interface IDashboardComponentState {
}

// type of store state of dashboard
export interface IDashboardState {
    template: Array<ITemplate>
}

// type of dashboard store
export type DashboardActionType = IAction<string, Partial<IDashboardState>>;

// type of specific action
export type GetTemplateActionType = IAction<string, any>


export type TemplateType = 'Resume' | 'Cover Letter';

export interface ITemplate { 
    ID: number;
    document: {
        templateID?: number;
        templateType?: TemplateType;
        templateName?: string;
        description?: string;
        templateThumbnailRef?: string;
        author?: string;
        associatedProfessions?: string;
        associatedCSS?: string;
        templateCode?: number;
        createdDateTime?: string;
        lastUpdatedDateTime?: string;
        templateSections?: Array<any>;
    }
}

export interface IGetTemplateResponse extends IApiErrorResponse {
    data?: Array<ITemplate>;
}