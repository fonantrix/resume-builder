import * as React from 'react';
import enhancer from '../../../dynamicStore/enhancer';
import injectStyle from '../../../utils/injectStyles';
import styles from './Home.style';
import reducer from './Home.reducer';
import saga from './Home.saga';
import { login } from './Home.actions';
import Loader from '../../atoms/Loader';
import { IHomeProps, IHomeComponentState, ILoginPayload } from './types';
import { AppDispatch, AppStore, FormFields, CreateFormFieldsType } from '../../../global/types';
import Log from '../../../utils/log';
import Form from '../../molecule/Form';
import Layout from '../../../global/Layout';
import { VALIDATION } from '../../../global/constant';
import Button from '../../atoms/Button';
import { SignupPage } from '../../../constants';
import { Helper } from '../../../utils/Helper';
import { IFormProps } from '../../molecule/Form/types';

class Home extends React.PureComponent<IHomeProps, IHomeComponentState> {

    state: IHomeComponentState = {
        formFields: []
    }

    componentDidCatch(error: any, errorInfo: any) {
        Log.error(JSON.stringify(errorInfo), JSON.stringify(errorInfo));
        // console.log('Error', error, errorInfo);
    }

    componentDidMount() {
        const { history, userData } = this.props;
        if(userData.userID){
            Helper.navigateUrl(history, "/dashboard");
            return;
        }
        const { formFields } = this.createFormFields({});
        this.setState({
            formFields
        })
    }

    createFormFields = (data: any): CreateFormFieldsType => {
        const formFields: FormFields = [
            {
                label: 'E-Mail',
                options: {
                    placeholder: `E-Mail`,
                    key: 'email',
                    isRequired: true,
                    validation: VALIDATION.EMAIL
                },
                type: 'email'
            },
            {
                label: 'Password',
                type: 'password',
                options: {
                    placeholder: `Password`,
                    isRequired: true,
                    key: 'password',
                    validation: VALIDATION.PASSWORD
                }
            },
        ]
        return { formFields }
    }

    loginHandler = (data: any) => {
        console.log(data);
        const { login } = this.props;
        login({
            data: {
                email: data.email,
                password: data.password,
            }
        })
    }

    registerHandler = () => {
        const { history } = this.props;
        Helper.navigateUrl(history, "/register");
    }

    render() {
        const { formFields } = this.state;
        const { className, loader } = this.props;
        const formProps: IFormProps = { heading: "Login Into Your Account", formFields, onSubmit: this.loginHandler, initailValues: {} };
        return (
            <Layout>
                <div className={className}>
                    <Button onClick={this.registerHandler} btnStyle="btn--blue" labelText={SignupPage.signupBtnTxt}/>
                    <Form {...formProps}></Form>
                </div>
            </Layout>

        )
    }
}

const mapStateToProps = (store: AppStore) => ({
    loader: store.global ? store.global.loader || false : false,
    userData: Helper.get(store, 'global.userData', {}),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (payload: ILoginPayload) => dispatch(login(payload)),
})

type DispatchType = typeof mapDispatchToProps;
type SagaType = typeof saga;
type ReducerType = typeof reducer;

export default enhancer<string, DispatchType, ReducerType, SagaType>(injectStyle(Home, styles), {
    key: 'home',
    mapStateToProps,
    mapDispatchToProps,
    reducer,
    saga
})