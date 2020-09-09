import { takeLatest, call, put } from 'redux-saga/effects';
import { UPDATE_PROFILE, UPDATE_PROFILE_FIELD } from './Profile.constant';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader, saveUserData } from '../App/App.actions';
import { ProfileActionReturnType, IProfilePayload, UpdateProfileFieldReturnType } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';

function* updateProfileSaga(payload: ProfileActionReturnType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        //to do : interface for response
        const response: any = yield call<any>(API.put, ApiRegistery.buildApiUrl(UPDATE_PROFILE, payload.payload), payload.payload);
        // console.log(response);
        if(response.data){
            yield put(saveUserData({
                userData: { ...payload.payload.data }
            }))
        }
    }
    catch(err) {
        Log.error('Error in updateProfileSaga Saga', JSON.stringify(err));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

function* updateProfileFieldSaga(payload: UpdateProfileFieldReturnType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        //to do : interface for response
        const response: any = yield call<any>(API.put, ApiRegistery.buildApiUrl(UPDATE_PROFILE_FIELD, payload.payload), payload.payload);
        // console.log(response);
        if(response.data){
            yield put(saveUserData({
                userData: { [payload.payload.data.key]: payload.payload.data.value }
            }))
        }
    }
    catch(err) {
        Log.error('Error in updateProfileSaga Saga', JSON.stringify(err));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* ProfileSaga() {
    try{
        yield takeLatest<ProfileActionReturnType>(UPDATE_PROFILE, updateProfileSaga);
        yield takeLatest<UpdateProfileFieldReturnType>(UPDATE_PROFILE_FIELD, updateProfileFieldSaga);
    }
    catch(err){
        console.log('Error in ProfileSaga', err)
    }
}