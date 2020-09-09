import { ISignupState, SignupActionType } from './types';
// import { IAction } from '../../../types';

const initState: ISignupState = {
    
};

export default (state = initState, action: SignupActionType): ISignupState => {
    switch(action.type){
        default:
            return state;
    }
}