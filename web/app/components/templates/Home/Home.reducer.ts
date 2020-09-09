// import { SAVE_MOVIE_LIST } from './Home.constant';
import { IHomeState, HomeActionType } from './types';
// import { IAction } from '../../../types';

const initState: IHomeState = {
    movieList: { Search: [] }
};

export default (state = initState, action: HomeActionType): IHomeState => {
    switch(action.type){
        // case SAVE_MOVIE_LIST:
        //     return { ...state, ...action.payload }
        default:
            return state;
    }
}