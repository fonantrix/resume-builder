import { IProfileState, ProfileActionType } from './types';
// import { IAction } from '../../../types';

const initState: IProfileState = {
    
};

export default (state = initState, action: ProfileActionType): IProfileState => {
    switch(action.type){
        default:
            return state;
    }
}