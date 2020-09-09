import { IFillCvState, IGetTemplateSectionPayload, GetTemplateSectionActionType, FillCvActionType, IUserResume, UpdateUserResumeActionType, IUpdateUserResumePayload, ICreateUserResumePayload, CreateUserResumeActionType } from './types';
import { GET_TEMPLATE_SECTION, SAVE_TEMPLATE_SECTION, UPDATE_USER_RESUME, CREATE_USER_RESUME, SAVE_USER_RESUME } from './FillCv.constant';

export const getTemplatesSection = (payload: IGetTemplateSectionPayload): GetTemplateSectionActionType => ({
    type: GET_TEMPLATE_SECTION,
    payload
})

export const saveTemplateSections = (payload: Partial<IFillCvState>): FillCvActionType => ({
    type: SAVE_TEMPLATE_SECTION,
    payload
})

export const updateUserResume = (payload: IUpdateUserResumePayload): UpdateUserResumeActionType => ({
    type: UPDATE_USER_RESUME,
    payload
})

export const createUserResume = (payload: ICreateUserResumePayload): CreateUserResumeActionType => ({
    type: CREATE_USER_RESUME,
    payload
})

export const saveUserResume = (payload: Partial<IFillCvState>): FillCvActionType => ({
    type: SAVE_USER_RESUME,
    payload
})