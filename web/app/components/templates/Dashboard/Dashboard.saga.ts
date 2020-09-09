import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_TEMPLATE } from './Dashboard.constant';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader } from '../App/App.actions';
import { DashboardActionType, GetTemplateActionType, IGetTemplateResponse } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';
import { saveTemplates } from './Dashboard.actions';

function* getTemplatesSaga(payload: GetTemplateActionType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        const response: IGetTemplateResponse = yield call<any>(API.get, ApiRegistery.buildApiUrl(GET_TEMPLATE));
        console.log(response);
        if(response.data){
            yield put<DashboardActionType>(saveTemplates({ template: response.data }));
        }
    }
    catch(err) {
        Log.error('Error in getTemplatesSaga Saga', JSON.stringify(err));
        // console.log('Error in getMovie Saga', err);
        // yield put<HomeActionType>(saveMovieList({movieList : {Response: "False", Message: 'Error fetching the Record'}}));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* DashboardSaga() {
    try{
        yield takeLatest<GetTemplateActionType>(GET_TEMPLATE, getTemplatesSaga);
    }
    catch(err){
        Log.error('Error in DashboardSaga Saga', JSON.stringify(err));
    }
}