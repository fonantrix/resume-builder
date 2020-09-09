import * as React from 'react';
import enhancer from '../../../dynamicStore/enhancer';
import injectStyle from '../../../utils/injectStyles';
import styles from './Profile.style';
import reducer from './Profile.reducer';
import saga from './Profile.saga';
import { updateProfile, updateProfileField } from './Profile.actions';
import { IProfileProps, IProfileComponentState, IProfilePayload, IUser, IUpdateProfileField } from './types';
import { AppDispatch, AppStore, FormFields, CreateFormFieldsType, IFormFieldTypes, IFormFieldValues } from '../../../global/types';
import Log from '../../../utils/log';
import Form from '../../molecule/Form';
import Layout from '../../../global/Layout';
import { ProfilePage } from '../../../constants/en-us';
import { ProfileFormFields } from './Profile.constant';
import { IFormProps } from '../../molecule/Form/types';
import { firebaseStore } from '../App/App';
import { Helper } from '../../../utils/Helper';
import Endpoint from '../../../api/endpoint';

class Profile extends React.PureComponent<IProfileProps, IProfileComponentState> {

    state: IProfileComponentState = {
        formFields: [],
        formFieldsValue: {}
    }

    componentDidCatch(error: any, errorInfo: any) {
        Log.error(JSON.stringify(errorInfo), JSON.stringify(errorInfo));
    }

    componentDidMount() {
        const { userData } = this.props;
        const initialData: any = userData;
        const { formFields, formFieldsValue } = this.createFormFields({}, initialData);
        this.setState({
            formFields,
            formFieldsValue
        })
    }

    createFormFields = (data: any, initialData: any): CreateFormFieldsType => {
        const formFields: FormFields = ProfileFormFields;
        let formFieldsValue: IFormFieldValues = {};

        formFields.forEach((field: IFormFieldTypes)  => {
            formFieldsValue[field.options.key] = initialData[field.options.key];
        });

        return { formFields, formFieldsValue }
    }

    profileHandler = (data: any) => {
        console.log(data);
        const { updateProfile, userData } = this.props;
        const userDataObj: IUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            nameSuffix: data.nameSuffix,
            title: data.title,
            dateOfBirth: data.dateOfBirth,
            nationality: data.nationality,
            mobile: data.mobile,
            emailAddress: data.emailAddress,
            website: data.website,
            streetNumber: data.streetNumber,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country,
            photoURL: userData.photoURL,
            profileText: data.profileText,
            displayName: data.displayName
        }
        console.log(userDataObj)
        updateProfile({
            data: userDataObj,
            urlParam: {
                "$user_id": userData.userID
            }
        })
    }

    fileUploadHandler = (file: File): void => {
        const { updateProfileField, userData } = this.props;
        const fileName = `${new Date().getTime()}.${file.name.split(".")[1]}`;
        const uploadPath = `users/${userData.userID}/profile`;
        const uploadTask: any = firebaseStore.storage.ref(`/${uploadPath}/${fileName}`).put(file);
        uploadTask.on('state_changed',
            (snapShot: any) => {
                //takes a snap shot of the process as it is happening
                console.log("snapShot", snapShot)
            }, (err: any) => {
                //catches the errors
                console.log(err)
            }, () => {
                firebaseStore.storage.ref(uploadPath).child(fileName).getDownloadURL()
                    .then((fireBaseUrl: any) => {
                        console.log("fireBaseUrl", fireBaseUrl);
                        const url = new URL(Helper.decodeURIComponent(fireBaseUrl));
                        const uploadUrl = url.pathname.split(Endpoint.static.BUCKET_URL)[1];
                        console.log("uploadUrl", uploadUrl);

                        const uploadObj: IUpdateProfileField = {
                            data: {
                                key: "photoURL",
                                value: uploadUrl
                            }
                        }
                        updateProfileField({
                            ...uploadObj,
                            urlParam: {
                                "$user_id": userData.userID
                            }
                        })
                    })
            })
    }

    render() {
        const { formFields, formFieldsValue } = this.state;
        const { className, userData } = this.props;
        const formProps: IFormProps = { heading: ProfilePage.pageHeading, formFields, isFileUpload: true, onSubmit: this.profileHandler, fileUpload: this.fileUploadHandler, initailValues: formFieldsValue};
        if (userData.photoURL) {
            formProps.imageUrl = `${Endpoint.static.FIRE_STORE_URL}${Helper.encodeURIComponent(userData.photoURL)}?${Endpoint.static.BUCKET_QUERY_PARAM}`;
        }
        return (
            <Layout>
                <div className={className}>
                    <Form {...formProps} ></Form>
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
    updateProfile: (payload: IProfilePayload) => dispatch(updateProfile(payload)),
    updateProfileField: (payload: IUpdateProfileField) => dispatch(updateProfileField(payload))
})

type DispatchType = typeof mapDispatchToProps;
type SagaType = typeof saga;
type ReducerType = typeof reducer;

export default enhancer<string, DispatchType, ReducerType, SagaType>(injectStyle(Profile, styles), {
    key: 'profile',
    mapStateToProps,
    mapDispatchToProps,
    reducer,
    saga
})