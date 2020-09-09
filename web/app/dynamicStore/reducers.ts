import { combineReducers } from 'redux';
import AppReducer from '../components/templates/App/App.reducer';

export default (injectReducers = {}) => {
    return combineReducers({
        global: AppReducer,
        ...injectReducers,
    })
}