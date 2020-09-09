import { REGISTER } from './Signup.constant';
import { ISignupPayload, ISignupState, SignupActionType, SignupActionReturnType } from './types';

export const register = (payload: ISignupPayload): SignupActionReturnType => ({
    type: REGISTER,
    payload
})
