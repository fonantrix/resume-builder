import { IAction, ITemplateFields, ITemplateFieldResponse } from '../../../global/types';
import { IUser } from '../Profile/types';

export interface IAppState {
    loader: boolean,
    userData: IUser,
    templateFields: ITemplateFieldResponse
}

export type AppActionType = IAction<string, Partial<IAppState>>;

export type GetTemplateFieldsActionType = IAction<string, any>