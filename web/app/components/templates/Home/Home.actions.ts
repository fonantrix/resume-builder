import { LOGIN } from './Home.constant';
import { ILoginPayload, IHomeState, HomeActionType, LoginActionType } from './types';
// import { IAction } from '../../../types';
// import { SAVE_MOVIE_LIST } from './Home.constant';

export const login = (payload: ILoginPayload): LoginActionType => ({
    type: LOGIN,
    payload
})

// export const saveMovieList = (payload: Partial<IAppState>): HomeActionType => ({
//     type: SAVE_MOVIE_LIST,
//     payload
// })