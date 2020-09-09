import { UPDATE_PROFILE, UPDATE_PROFILE_FIELD } from './Profile.constant';
import { IProfilePayload, IProfileState, ProfileActionType, ProfileActionReturnType, IUpdateProfileField, UpdateProfileFieldReturnType } from './types';

export const updateProfile = (payload: IProfilePayload): ProfileActionReturnType => ({
    type: UPDATE_PROFILE,
    payload
})

export const updateProfileField = (payload: IUpdateProfileField): UpdateProfileFieldReturnType => ({
    type: UPDATE_PROFILE_FIELD,
    payload
})