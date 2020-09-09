// import { SAVE_MOVIE_LIST } from './Home.constant';
import { IDashboardState, DashboardActionType } from './types';
import { SAVE_TEMPLATE } from './Dashboard.constant';
// import { IAction } from '../../../types';

const initState: IDashboardState = {
    template: []
};

export default (state = initState, action: DashboardActionType): IDashboardState => {
    switch(action.type){
        case SAVE_TEMPLATE:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}