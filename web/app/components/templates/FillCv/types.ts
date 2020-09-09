import { IAction, FormFields, IApiErrorResponse, ITemplateFieldResponse, ITemplateFields } from '../../../global/types';
import { IComponentTheme, IComponentProps } from '../../../styles/theme/types';
import { IApiUrl, IKeyValue } from '../../../api/types';
import { IFormProps } from '../../molecule/Form/types';
import { GetTemplateFieldsActionType, IAppState, AppActionType } from '../App/types';
import { IUser } from '../Profile/types';

export interface IFillCvProps extends IComponentTheme, IComponentProps {
    loader: boolean;
    className: any;
    templateSections: {[key: string]: ITemplateSection};
    templateFields: ITemplateFieldResponse;
    userData: IUser;
    userResume: {};
    updateUserResume(payload: IUpdateUserResumePayload): UpdateUserResumeActionType;
    getTemplatesSection(payload: IGetTemplateSectionPayload): GetTemplateSectionActionType;
    getTemplateFields(): GetTemplateFieldsActionType;  
    createUserResume(payload: ICreateUserResumePayload): CreateUserResumeActionType;
    toggleLoader(payload: Partial<IAppState>): AppActionType;
}

export interface IFillCvComponentState {
    personalFormFields: FormFields;
    educationFormFields: FormFields;
    workFormFields: FormFields;
    voluntFormFields: FormFields;
    forms: Array<IFormProps>;
    formsRefs?: Array<React.RefObject<HTMLFormElement>>;
}

export interface IGetTemplateSectionPayload extends IApiUrl {

}

// type of store state of FillCv
export interface IFillCvState {
    templateSections: {[key: string]: ITemplateSection},
    userResume: any;
}

// type of FillCv store
export type FillCvActionType = IAction<string, Partial<IFillCvState>>;

// type of specific action
export type GetTemplateSectionActionType = IAction<string, IGetTemplateSectionPayload>

export type UpdateUserResumeActionType = IAction<string, IUpdateUserResumePayload>;

export type CreateUserResumeActionType = IAction<string, ICreateUserResumePayload>;

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

export interface ITemplateSection {
    helpIconRef?: string;
    sectionIconRef?: string;
    deleteIconRef?: string;
    sectionType?: string;
    templateID?: any;
    hasChildren?: number;
    description?: string;
    sectionIndex?: number;
    associatedCSS?: string;
    defaultSectionName?: string;
    templateSectionID?: string;
    templateSectionFields?: Array<ITemplateSectionFields>;
}

export interface ITemplateSectionFields {
        minLength?: number,
        sectionID?: any;
        templateFieldMnemonic?: string;
        fieldID?: any;
        maxLenth?: number,
        fieldIndex?: number,
        defaultInput?: string;
        templateSectionFieldID?: string;
}

export interface IUserResumeSection { 
    sectionID?: string;
    resumeID?: string;
    sectionIndex?: number;
    sectionName?: string;
    overrideSectionName?: string;
    description?: string;
    sectionIconRef?: string;
    overrideSectionIconRef?: string;
    helpIconRef?: string;
    overrideHelpIconRef?: string;
    deleteIconRef?: string;
    overrideDeleteIconRef?: string;
    associatedCSS?: string;
    overrideAssociatedCSS?: string;
    sectionBarColor?: string;
    overrideSectionBarColor?: string;
    sectionFields?: Array<IUserResumeSectionFields>;
}

export interface IUpdateUserResumePayload extends IApiUrl {
    data: IUserResume;
}

export interface IUserResume {
    userID?: string;
    resumeID?: string;
    templateID?: string;
    createdBy?: string;
    creationDatetime?: string;
    lastUpdatedDateTime?: string;
    userResumeSections?: Array<IUserResumeSection>;
}

export interface IUserResumeSectionFields { 
    sectionFieldID?: string;
    fieldID?: string;
    sectionID?: string;
    fieldName?: string;
    fieldLabel?: string;
    overrideFieldLabel?: string;
    fieldLabelFont?: string;
    overrideFieldLabelFont?: string;
    fieldLabelFontSize?: string;
    overrideFieldLabelFontSize?: string;
    fieldLabelFormatting?: string;
    overrideFieldLabelFormatting?: string;
    fieldValueText?: string;
    fieldValuePictureRef?: string;
    fieldTextFont?: string;
    overrideFieldTextFont?: string;
    fieldTextFontSize?: string;
    overrideFieldTextFontSize?: string;
    fieldTextFormatting?: string;
    overrideFieldTextFormatting?: string;
    associatedCSS?: string;
    overrideAssociatedCSS?: string;
}

export interface ICreateUserResumePayload {
    data: {
        requestID?: string;
        UserID?: string;
        templateID?: string;
        requestDateTime?: string;
        assignedToUser?: string;
        assignmentHistory?: string;
        completionDateTime?: string;
        requestStatus?: string;
    }
}

