import * as React from 'react';
import enhancer from '../../../dynamicStore/enhancer';
import injectStyle from '../../../utils/injectStyles';
import styles from './Signup.style';
import reducer from './Signup.reducer';
import saga from './Signup.saga';
import { register } from './Signup.actions';
import { ISignupProps, ISignupComponentState, ISignupPayload } from './types';
import { AppDispatch, AppStore, FormFields, CreateFormFieldsType, IFormFieldValues, IFormFieldTypes } from '../../../global/types';
import Log from '../../../utils/log';
import Form from '../../molecule/Form';
import Layout from '../../../global/Layout';
import { SignupPage } from '../../../constants/en-us';
import { VALIDATION } from '../../../global/constant';
import { Helper } from '../../../utils/Helper';
import { IFormProps } from '../../molecule/Form/types';

class Signup extends React.PureComponent<ISignupProps, ISignupComponentState> {

    state: ISignupComponentState = {
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
                label: 'Display Name',
                options: {
                    placeholder: `Display Name`,
                    key: 'displayName',
                    isRequired: true,
                },
                type: 'text'
            },
            {
                label: 'First Name',
                options: {
                    placeholder: `First Name`,
                    key: 'firstName',
                    isRequired: true,
                },
                type: 'text'
            },
            {
                label: 'Last Name',
                options: {
                    placeholder: `Last Name`,
                    key: 'lastName',
                    isRequired: true,
                },
                type: 'text'
            },
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

    signupHandler = (data: any) => {
        console.log(data);
        const { signup } = this.props;
        signup({
            data: {
                userRef: { 
                    emailAddress: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    displayName: data.displayName
                }
            }
        })
    }

    render() {
        const { formFields } = this.state;
        const { className } = this.props;
        const formProps: IFormProps = { heading: SignupPage.pageHeading, formFields, onSubmit: this.signupHandler, initailValues: {} };
        return (
            <Layout>
                <div className={className}>
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
    signup: (payload: ISignupPayload) => dispatch(register(payload)),
})

type DispatchType = typeof mapDispatchToProps;
type SagaType = typeof saga;
type ReducerType = typeof reducer;

export default enhancer<string, DispatchType, ReducerType, SagaType>(injectStyle(Signup, styles), {
    key: 'signup',
    mapStateToProps,
    mapDispatchToProps,
    reducer,
    saga
})