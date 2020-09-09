import injectReducer from './reducerInjectors';
import { injectSaga, ejectSaga } from './sagaInjectors';
import Log from '../utils/log';

export default (key: any, store: any, saga: any, reducer: any) => {
    try{
        // Object.keys(store.injectedSagas).forEach((sagas, sagaName) => {
        //     ejectSaga(sagaName, store)
        //     delete store.injectedSagas[sagaName];
        // });
        
        if (reducer) injectReducer(store, key, reducer);
        if (saga) injectSaga(store, key, { saga });
    }
    catch(err) {
        Log.error('Error in injectSagaAndReducer', JSON.stringify(err));
        // console.log('Error in injectSagaAndReducer', err)
    }
}