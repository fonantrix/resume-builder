import { IAction, FormFields } from '../../../global/types';
import { IComponentTheme, IComponentProps } from '../../../styles/theme/types';
import { IUser } from '../Profile/types';

export interface ISignupProps extends IComponentTheme, IComponentProps {
    className: any;
    userData: IUser;
    signup(data: ISignupPayload): void 
}

export interface ISignupComponentState {
    formFields: FormFields;
}

export interface ISignupState {
}

export interface ISignupPayload {
    data: { userRef : { emailAddress: string, password: string, firstName?: string, lastName?: string, displayName?: string }};
}

export type SignupActionType = IAction<string, Partial<ISignupState>>;

export type SignupActionReturnType = IAction<string, ISignupPayload>
