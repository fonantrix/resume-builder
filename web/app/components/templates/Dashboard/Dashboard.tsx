import * as React from 'react';
import enhancer from '../../../dynamicStore/enhancer';
import injectStyle from '../../../utils/injectStyles';
import styles from './Dashboard.style';
import reducer from './Dashboard.reducer';
import saga from './Dashboard.saga';
import { getTemplates } from './Dashboard.actions';
import { IDashboardProps, IDashboardComponentState } from './types';
import { AppDispatch, AppStore } from '../../../global/types';
import Log from '../../../utils/log';
import SelectTemplate from '../../organisms/SelectTemplate';
import Layout from '../../../global/Layout';
import { Helper } from '../../../utils/Helper';


class Dashboard extends React.PureComponent<IDashboardProps, IDashboardComponentState> {

    componentDidCatch(error: any, errorInfo: any) {
        Log.error(JSON.stringify(errorInfo), JSON.stringify(errorInfo));
        // console.log('Error', error, errorInfo);
    }

    componentDidMount() {
        const { getTemplates } = this.props;
        getTemplates();
    }

    selectTemplateHandler = (id: number): void => {
        const { history } = this.props;
        history.push(`/fill-in/${id}`);
    }

    previewTemplateHandler = () => {

    }

    render() {
        const { className, template } = this.props;
        const selectTempProps = { data: template };
        return (
            <Layout>
                <div className={className}>
                    <SelectTemplate selectHandler={this.selectTemplateHandler} previewHandler={this.previewTemplateHandler} {...selectTempProps} />
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (store: AppStore) => ({
    loader: Helper.get(store, 'global.loader', false),
    template: Helper.get(store, 'dashboard.template', [])
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getTemplates: () => dispatch(getTemplates()),
})

type DispatchType = typeof mapDispatchToProps;
type SagaType = typeof saga;
type ReducerType = typeof reducer;

export default enhancer<string, DispatchType, ReducerType, SagaType>(injectStyle(Dashboard, styles), {
    key: 'dashboard',
    mapStateToProps,
    mapDispatchToProps,
    reducer,
    saga
})