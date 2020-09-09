import { GET_TEMPLATE, SAVE_TEMPLATE } from './Dashboard.constant';
import { IDashboardState, DashboardActionType, GetTemplateActionType } from './types';

export const getTemplates = (): GetTemplateActionType => ({
    type: GET_TEMPLATE,
})

export const saveTemplates = (payload: Partial<IDashboardState>): DashboardActionType => ({
    type: SAVE_TEMPLATE,
    payload
})