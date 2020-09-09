import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSagaAndReducer from './injectSagaAndReducer';
import { store } from '../app';
import { ejectSaga } from './sagaInjectors';
import { ReactComponentType, IEnhancerParam } from '../global/types';
import { StyledComponentProps } from 'styled-components';
export let historyRouter: any = null;
//To Do : modify it to use Partial<IEnhancerParam<D, R, Saga>
export const getWrappedComponent = <K extends string, D, R, Saga>(
    WrappedComponent: any, params: { key: K, reducer: R, saga: Saga }
): ReactComponentType => {
    const { key, reducer, saga } = params;
    class WrapperComponent extends React.Component<any> {

        constructor(props: any) {
            super(props);
            const { history } = this.props;
            if (!historyRouter) {
                historyRouter = history;
            }
            injectSagaAndReducer(key, store, saga, reducer);
        }

        componentWillUnmount() {
            ejectSaga(key, store);
            delete store.injectedSagas[key];
        }

        render() {
            return <WrappedComponent  {...this.props} />
        }
    }
    return WrapperComponent
}

const enhancer = <Key extends string, Dispatch, Reducer, Saga>(WrappedComponent: StyledComponentProps<any, any, any, any>,
    params: IEnhancerParam<Key, Dispatch, Reducer, Saga>,
) => {
    const { mapStateToProps, mapDispatchToProps, key, reducer, saga } = params
    const Component: ReactComponentType = getWrappedComponent<Key, Dispatch, Reducer, Saga>(WrappedComponent, {
        key,
        reducer,
        saga,
    });
    const connectWith = connect(mapStateToProps, mapDispatchToProps);
    return compose(connectWith)(Component);
}

export default enhancer;