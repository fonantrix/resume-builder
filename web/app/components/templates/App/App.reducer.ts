import { TOGGLE_LOADER, SAVE_USER_DATA, SAVE_TEMPLATE_FIELDS } from './App.constant';
import { IAppState, AppActionType } from './types';
import { Helper } from '../../../utils/Helper';

const initState: IAppState = {
    loader: false,
    userData: {},
    templateFields: {}
};

export default (state = initState, action: AppActionType): IAppState => {
    switch(action.type){
        case TOGGLE_LOADER:
            return { ...state, ...action.payload };
        case SAVE_USER_DATA:
            const userData = { ...state.userData, ...action.payload.userData };
            Helper.setStorageData("userData", userData);
            return { ...state, userData };
        case SAVE_TEMPLATE_FIELDS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}