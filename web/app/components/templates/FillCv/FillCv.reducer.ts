// import { SAVE_MOVIE_LIST } from './Home.constant';
import { IFillCvState, FillCvActionType, ITemplateSection } from './types';
import { SAVE_TEMPLATE_SECTION, SAVE_USER_RESUME } from './FillCv.constant';

const initState: IFillCvState = {
    templateSections: {},
    userResume: {}
};

export default (state = initState, action: FillCvActionType): IFillCvState => {
    switch(action.type){
        case SAVE_TEMPLATE_SECTION:
            return { ...state, ...action.payload }
        case SAVE_USER_RESUME:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}