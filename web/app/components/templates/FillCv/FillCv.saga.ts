import { takeLatest, call, put } from 'redux-saga/effects';
import API from '../../../api/fetch-lib';
import ApiRegistery from '../../../api/api-registery';
import { toggleLoader } from '../App/App.actions';
import { GetTemplateSectionActionType, FillCvActionType, UpdateUserResumeActionType, CreateUserResumeActionType } from './types';
import { SagaIterator } from 'redux-saga';
import Log from '../../../utils/log';
import { GET_TEMPLATE_SECTION, UPDATE_USER_RESUME, CREATE_USER_RESUME } from './FillCv.constant';
import { saveTemplateSections, saveUserResume } from './FillCv.actions';
import * as GET_TEMPLATE_SECTION_MOCK from './MockResponse/GetTemplateSection.json';
import { Helper } from '../../../utils/Helper';

const formatTemplateSectionRes = (result: any): any => {
    const _fields: any = {};
    result.forEach((element: any) => {
        if(!_fields[element.templateSectionID]){
            _fields[element.templateSectionID] = {}
        }
        _fields[element.templateSectionID] = element;
    });

    return _fields;
}

function* getTemplatesSectionSaga(payload: GetTemplateSectionActionType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        const response: any = yield call<any>(API.get, ApiRegistery.buildApiUrl(GET_TEMPLATE_SECTION, payload.payload));
        const result: any = formatTemplateSectionRes(response.data);
        // const responseMock: any = GET_TEMPLATE_SECTION_MOCK;
        // console.log("getTemplatesSectionSaga", response);
        if(response.data){
            yield put<FillCvActionType>(saveTemplateSections({ templateSections: result }));
        }
    }
    catch(err) {
        Log.error('Error in getTemplatesSaga Saga', JSON.stringify(err));
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

function* updateUserResumeSaga(payload: UpdateUserResumeActionType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        const response: any = yield call<any>(API.put, ApiRegistery.buildApiUrl(UPDATE_USER_RESUME, payload.payload),  payload.payload);
        console.log(response);
        // const result: any = formatTemplateSectionRes(response.data);
        // // const responseMock: any = GET_TEMPLATE_SECTION_MOCK;
        // // console.log("getTemplatesSectionSaga", response);
        // if(response.data){
        //     yield put<FillCvActionType>(saveTemplateSections({ templateSections: result }));
        // }
    }
    catch(err) {
        Log.error('Error in updateUserResumeSaga Saga', err);
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

function* createUserResumeSaga(payload: CreateUserResumeActionType): SagaIterator {
    try{
        yield put(toggleLoader({ loader: true }));
        // to do : interface for response
        const response: any = yield call<any>(API.post, ApiRegistery.buildApiUrl(CREATE_USER_RESUME, payload.payload),  payload.payload);
        console.log(response);
        yield put<FillCvActionType>(saveUserResume({ userResume: Helper.get(response, "data.output", {})}));

    }
    catch(err) {
        Log.error('Error in createUserResumeSaga Saga', err);
    }
    finally{
        yield put(toggleLoader({ loader: false }));
    }
}

export default function* FillCvSaga() {
    try{
        yield takeLatest<GetTemplateSectionActionType>(GET_TEMPLATE_SECTION, getTemplatesSectionSaga);
        yield takeLatest<UpdateUserResumeActionType>(UPDATE_USER_RESUME, updateUserResumeSaga);
        yield takeLatest<CreateUserResumeActionType>(CREATE_USER_RESUME, createUserResumeSaga);
    }
    catch(err){
        Log.error('Error in FillCvSaga Saga', JSON.stringify(err));
    }
}