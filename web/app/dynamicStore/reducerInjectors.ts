import createReducers from './reducers';

export default (store: any, key: string, reducer: any) => {
    try{
        store.injectedReducers[key] = reducer;
        store.replaceReducer(createReducers(store.injectedReducers));
    }
    catch(err){
        console.log('Error in reducerInjectors', err);
    }
}