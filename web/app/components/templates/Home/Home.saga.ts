import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN } from './Home.constant';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader, saveUserData } from '../App/App.actions';
import { HomeActionType, LoginActionType, ILoginPayload } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';
import { useHistory } from "react-router-dom";
import { historyRouter } from '../../../dynamicStore/enhancer';
import { Helper } from '../../../utils/Helper';
// import { browserHistory } from 'react-router';

function* loginSaga(payload: LoginActionType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        
        const response: any = yield call<any>(API.post, ApiRegistery.buildApiUrl(LOGIN, payload.payload), payload.payload);
        console.log(response);
        if(response.data){
            yield put(saveUserData({
                userData: response.data
            }));
            yield put<any>(Helper.navigateWindowUrl("/dashboard"));
            return;
        }
    }
    catch(err) {
        Log.error('Error in loginSaga Saga', JSON.stringify(err));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* HomeSaga() {
    try{
        yield takeLatest<LoginActionType>(LOGIN, loginSaga);
    }
    catch(err){
        console.log('Error in homesaga', err)
    }
}