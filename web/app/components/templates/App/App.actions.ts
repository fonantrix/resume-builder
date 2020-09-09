import { TOGGLE_LOADER, SAVE_USER_DATA, GET_TEMPLATE_FIELDS, SAVE_TEMPLATE_FIELDS } from './App.constant';
import { IAppState, AppActionType, GetTemplateFieldsActionType } from './types';
import { ITemplateFields } from '../../../global/types';

export const toggleLoader = (payload: Partial<IAppState>): AppActionType => ({
    type: TOGGLE_LOADER,
    payload
})

export const saveUserData = (payload: Partial<IAppState>): AppActionType => ({
    type: SAVE_USER_DATA,
    payload
})

export const getTemplateFields = (): GetTemplateFieldsActionType => ({
    type: GET_TEMPLATE_FIELDS,
})

export const saveTemplateFields = (payload: Partial<IAppState>): AppActionType => ({
    type: SAVE_TEMPLATE_FIELDS,
    payload
})

