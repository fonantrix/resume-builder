import { IAction, FormFields } from '../../../global/types';
import { IComponentTheme, IComponentProps } from '../../../styles/theme/types';
import { IUser } from '../Profile/types';

export interface IHomeProps extends IComponentTheme, IComponentProps {
    loader: boolean;
    className: any;
    userData: IUser;
    login(data: ILoginPayload): void 
}

export interface IHomeComponentState {
    formFields: FormFields;
}

export interface IHomeState {
    // movieList: { Search : Array<any> } |  { Response : string; Message: string }
}

export interface ILoginPayload {
    data: { email: string, password: string }
}

export type HomeActionType = IAction<string, Partial<IHomeState>>;

export type LoginActionType = IAction<string, ILoginPayload>
