import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Helper } from '../utils/Helper';
import { saveUserData } from '../components/templates/App/App.actions';
import { IUser } from '../components/templates/Profile/types';
import AppSaga from '../components/templates/App/App.saga';

const makeConfigureStore = (reducer: any, initialState: any, middleWare: Array<any>) => createStore(
    reducer,
    initialState,
    composeWithDevTools(...middleWare) // To Do : change it with compose
)

const initializeUserData = (store: any) => {
    const userData: any = Helper.getStorageData<IUser>("userData");
    if(userData){
        store.dispatch(saveUserData({userData}))
    }
}

export default (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const composesagaMiddleWare = [sagaMiddleware];
    const middleWare: Array<any> = [applyMiddleware(...composesagaMiddleWare)]
    const store: any = makeConfigureStore(createReducer(), initialState, middleWare);
    
    initializeUserData(store);

    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry

    store.AppSaga = { AppSaga, task: store.runSaga(AppSaga) };

    store.injectedSagas = {};
    return store;
}