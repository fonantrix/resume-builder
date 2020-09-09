import { takeLatest, call, put } from 'redux-saga/effects';
import { REGISTER } from './Signup.constant';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader, saveUserData } from '../App/App.actions';
import { SignupActionReturnType, ISignupPayload } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';
import { historyRouter } from '../../../dynamicStore/enhancer';
import { Helper } from '../../../utils/Helper';

function* registerSaga(payload: SignupActionReturnType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        //to do : interface for response
        const response: any = yield call<any>(API.post, ApiRegistery.buildApiUrl(REGISTER, payload.payload), payload.payload);
        console.log(response);

        if(response.data){
            yield put(saveUserData({
                userData: response.data
            }));
            yield put<any>(Helper.navigateWindowUrl("/profile"));
            return;
        }
    }
    catch(err) {
        Log.error('Error in registerSaga Saga', JSON.stringify(err));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* SignupSaga() {
    try{
        yield takeLatest<SignupActionReturnType>(REGISTER, registerSaga);
    }
    catch(err){
        console.log('Error in SignupSaga', err)
    }
}