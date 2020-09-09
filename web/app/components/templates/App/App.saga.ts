import { takeLatest, call, put } from 'redux-saga/effects';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader, saveTemplateFields } from '../App/App.actions';
import { GetTemplateFieldsActionType, AppActionType } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';
import { GET_TEMPLATE_FIELDS } from './App.constant';
//@ts-ignore
import * as GET_TEMPLATE_FIELDS_MOCK from './MockResponse/GetTemplateFields.json';
import { ITemplateFieldResponse, ITemplateFields } from '../../../global/types';

const formatTemplateFieldRes = (result: any): ITemplateFieldResponse => {
    const _fields: any = {};
    result.forEach((element: ITemplateFields) => {
        if(!_fields[element.fieldID]){
            _fields[element.fieldID] = {}
        }
        _fields[element.fieldID] = element;
    });

    return _fields;
}

function* getTemplateFieldsSaga(): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        const responseApi: any = yield call<any>(API.get, ApiRegistery.buildApiUrl(GET_TEMPLATE_FIELDS));
        console.log("responseApi", responseApi);
        // const response = GET_TEMPLATE_FIELDS_MOCK;
        const response = responseApi;
        const result: ITemplateFieldResponse = formatTemplateFieldRes(response.data);

        console.log("getTemplateFieldsSaga", response);
        // if(response.output){
            yield put<AppActionType>(saveTemplateFields({ templateFields: result }));
        // }
    }
    catch(err) {
        Log.error('Error in getTemplateFieldsSaga Saga', err);
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* AppSaga() {
    try{
        yield takeLatest<GetTemplateFieldsActionType>(GET_TEMPLATE_FIELDS, getTemplateFieldsSaga);
    }
    catch(err){
        Log.error('Error in AppSaga Saga', JSON.stringify(err));
    }
}