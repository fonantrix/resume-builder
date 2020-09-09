import { IAction, FormFields, IFormFieldValues } from '../../../global/types';
import { IComponentTheme } from '../../../styles/theme/types';
import { IApiUrl } from '../../../api/types';

export interface IProfileProps extends IComponentTheme {
    className: any;
    userData: IUser
    updateProfileField(data: IUpdateProfileField): void;
    updateProfile(data: IProfilePayload): void 
}

export interface IProfileComponentState {
    formFields: FormFields;
    formFieldsValue: IFormFieldValues
}

export interface IProfileState {
}

export interface IProfilePayload extends IApiUrl{
    data: IUser
}

export interface IUpdateProfileField extends IApiUrl {
    data: { key: string; value: string; }
}

export interface IUser { 
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nameSuffix?: string;
    title?: string;
    addresses?: string;
    dateOfBirth?: string;
    nationality?: string;
    mobile?: string;
    emailAddress?: string;
    website?: string;
    streetNumber?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    photoURL?: string;
    userID?: string;
    profileText?: string;
    displayName?: string;
}

export type ProfileActionType = IAction<string, Partial<IProfileState>>;

export type ProfileActionReturnType = IAction<string, IProfilePayload>

export type UpdateProfileFieldReturnType = IAction<string, IUpdateProfileField>;
