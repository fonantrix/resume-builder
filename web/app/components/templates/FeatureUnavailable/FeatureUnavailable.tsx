import * as React from 'react';
import injectStyle from '../../../utils/injectStyles';
import styles from './FeatureUnavailable.style';
import Log from '../../../utils/log';
import Layout from '../../../global/Layout';
import { IFeatureUnavailableProps, IFeatureUnavailableComponentState } from './types';

class FeatureUnavailable extends React.PureComponent<IFeatureUnavailableProps, IFeatureUnavailableComponentState> {

    componentDidCatch(error: any, errorInfo: any) {
        Log.error(JSON.stringify(errorInfo), JSON.stringify(errorInfo));
    }

    componentDidMount() {
    }

    render() {
        const { className } = this.props;
        return (
            <Layout>
                <div className={className}>
                    Feature Under Development
                </div>
            </Layout>
        )
    }
}

export default injectStyle(FeatureUnavailable, styles)