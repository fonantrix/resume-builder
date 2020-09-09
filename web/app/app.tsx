import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/templates/App';
import configureStore from './dynamicStore/configureStore';

const initialState = {};
export const store = configureStore(initialState);
const mount = document.getElementById('app');

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    mount
)