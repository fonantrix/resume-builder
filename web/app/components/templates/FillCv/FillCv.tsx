import * as React from 'react';
import enhancer from '../../../dynamicStore/enhancer';
import injectStyle from '../../../utils/injectStyles';
import styles, { EducationForm } from './FillCv.style';
import reducer from './FillCv.reducer';
import saga from './FillCv.saga';
import { getTemplatesSection, updateUserResume, createUserResume } from './FillCv.actions';
import { IFillCvProps, IFillCvComponentState, IGetTemplateSectionPayload, ITemplateSection, ITemplateSectionFields, IUserResumeSection, IUserResume, IUpdateUserResumePayload, IUserResumeSectionFields, ICreateUserResumePayload } from './types';
import { AppDispatch, AppStore, FormFields, CreateFormFieldsType, IFormFieldTypes, ITemplateFields, InputFieldType } from '../../../global/types';
import Log from '../../../utils/log';
import Layout from '../../../global/Layout';
import { Helper } from '../../../utils/Helper';
import { PersonalFormFields, EducationFormFields, WorkExpFormFields, VolunterFormFields, FieldTypeConfig, SectionTypeConfig, TemplateFieldTypeConfig, MonthDropdown, YearDropdown, SkillLevel } from './FillCv.constant';
import Form from '../../molecule/Form';
import { IFormProps } from '../../molecule/Form/types';
import { getTemplateFields, toggleLoader } from '../App/App.actions';
import Button from '../../atoms/Button';
import { IKeyValue } from '../../../api/types';
import * as CreateResumeMock from './MockResponse/CreateResumeObj.json';
import { IAppState } from '../App/types';

class FillCv extends React.Component<IFillCvProps, IFillCvComponentState> {

    state: IFillCvComponentState = {
        personalFormFields: [],
        educationFormFields: [],
        workFormFields: [],
        voluntFormFields: [],
        forms: [],
        formsRefs: []
    }
    sectionsToEnabled: any = {"Education":"Education", "Work experience":"Work experience", "Skills":"Skills", "Personal Info":"Personal Info"}
    userResumeSectionArr: Array<IUserResumeSection> = [];
    dateRangeField: any = {
        "month-from": 1,
        "month-to": 2,
        "year-from": 3,
        "year-to": 4
    }

    componentDidCatch(error: any, errorInfo: any) {
        const { toggleLoader } = this.props;
        toggleLoader({ loader: false });
        Log.error(JSON.stringify(errorInfo), JSON.stringify(errorInfo));
        // console.log('Error', error, errorInfo);
    }

    componentDidUpdate(prevProps: IFillCvProps) {
        if (this.props !== prevProps) {
            const { templateSections } = this.props;
            
            this.constructForm(templateSections);
        }
    }

    constructInitialValuesForm = (formFieldsObj: FormFields) => {
        const _initValue: IKeyValue = {};
        formFieldsObj.forEach((item: IFormFieldTypes) => {
            _initValue[item.options.key] = "";
        })
        return _initValue;
    }

    constructForm = (templateSections: {[key: string]: ITemplateSection}) => {
        const _forms: Array<IFormProps> = [];
        const _formsRefs: Array<React.RefObject<HTMLFormElement>> = [];
        Object.entries(templateSections).forEach((entry: Array<any>, index: number) => {
            const item: ITemplateSection = entry[1];
            if(this.sectionsToEnabled[item.defaultSectionName]){
                const formFieldsObj: FormFields = this.constructTemplateSectionFields(Helper.get(item, "templateSectionFields", []), item.templateSectionID);
                const formRef = React.createRef<HTMLFormElement>();
                _formsRefs.push(formRef);
                const initailValues = this.constructInitialValuesForm(formFieldsObj);
                const formProps: IFormProps = {
                    formHeader: { 
                        centerText: Helper.get(item, "defaultSectionName", ""),
                        leftContent: Helper.constructImageUrl(Helper.get(item, 'sectionIconRef', ""))
                    },
                    formFields: formFieldsObj,
                    initailValues,
                    showSubmitBtn: true,
                    submitVisibility: "hidden",
                    //@ts-ignore
                    ref: formRef,
                    onSubmit: (data) => { this.formDataCollector({[`${item.templateSectionID}`]: data})},
                    isFileUpload: SectionTypeConfig[Helper.get(item, "defaultSectionName", "")] || false
                }

                _forms.push(formProps);
            }
        })
        this.setState({
            forms: _forms,
            formsRefs: _formsRefs
        })
        toggleLoader({ loader: false });
    }

    constructTemplateSectionFields(templateSectionFields: Array<ITemplateSectionFields>, templateSectionId: string): FormFields {
        const { templateFields } = this.props;
        let _formFields: FormFields = [];
        templateSectionFields.forEach((item: ITemplateSectionFields, index: number) => {
            const _field: ITemplateFields = Helper.get(templateFields, `${Helper.get(item, "fieldID._path.segments.1", "")}`, {});
            const sectionFieldId: string = Helper.get(item, "templateSectionFieldID", "");
            const _fieldType = TemplateFieldTypeConfig[`${Helper.get(_field, "fieldContentType.type", TemplateFieldTypeConfig.String)}`];
            switch(_fieldType){
                case TemplateFieldTypeConfig["DateRange"]:
                    _formFields = [..._formFields, ...this.constructDateRange(_field, templateSectionId, _fieldType, sectionFieldId)];
                    break;
                case TemplateFieldTypeConfig["rating"]:
                    _formFields.push(this.constructRatingField(_field, item, _fieldType, sectionFieldId));
                    break;
                case TemplateFieldTypeConfig["Boolean"]:
                    break;
                default:
                    _formFields.push(this.constructFormField(_field, item, _fieldType, sectionFieldId));
                    break;                  
            }
            
        })  
        return _formFields;
    }

    constructRatingField = (field: ITemplateFields, item: ITemplateSectionFields, fieldType: InputFieldType, sectionFieldId: string) => {
        const obj: IFormFieldTypes = {
            label: Helper.get(field, "fieldLabel", ""),
            options: {
                title: Helper.get(item, "templateFieldMnemonic", ""),
                key: `${sectionFieldId}_${Helper.get(field, "fieldID", "")}`,
                list: SkillLevel
            },
            type: "dropdown"
        }
        return obj;
    }

    constructFormField = (field: ITemplateFields, item: ITemplateSectionFields, fieldType: InputFieldType, sectionFieldId: string) => {
        const obj: IFormFieldTypes = {
            label: Helper.get(field, "fieldLabel", ""),
            options: {
                placeholder: Helper.get(item, "templateFieldMnemonic", ""),
                key: `${sectionFieldId}_${Helper.get(field, "fieldID", "")}`,
            },
            type: fieldType
        }
        return obj;
    }

    constructDateRange = (field: ITemplateFields, templateSectionId: string, fieldType: InputFieldType, sectionFieldId: string) => {
        const monthFrom: IFormFieldTypes = {
            label: "Select From Month",
            options: {
                key: `${sectionFieldId}_${field.fieldID}_month-from`,
                title: "Select From Month",
                list: MonthDropdown
            },
            type: fieldType
        }
        const monthTo = {
            label: "Select To Month",
            options: {
                key: `${sectionFieldId}_${field.fieldID}_month-to`,
                title: "Select To Month",
                list: MonthDropdown
            },
            type: fieldType
        };

        const yearFrom: IFormFieldTypes = {
            label: "Select From Year",
            options: {
                key: `${sectionFieldId}_${field.fieldID}_year-from`,
                title: "Select From Year",
                list: YearDropdown
            },
            type: fieldType
        }

        const yearTo = {
            label: "Select To Year",
            options: {
                key: `${sectionFieldId}_${field.fieldID}_year-to`,
                title: "Select To Year",
                list: YearDropdown
            },
            type: fieldType
        };

        return [monthFrom, yearFrom, monthTo, yearTo];
    }

    formSubmitHandler = () => {
        const { formsRefs } = this.state;
        const { userData, updateUserResume, userResume } = this.props;
        formsRefs.forEach((item: React.RefObject<HTMLFormElement>, index: number) => {
            item.current.dispatchEvent(new Event("submit"));
        })
        console.log(this.userResumeSectionArr);
        // const userResumeObj: IUpdateUserResumePayload = {
        //     urlParam: {
        //         $resumeId: Helper.get(userResume, "resumeID", "")
        //     },
        //     data: {
        //         userID: userData.userID,
        //         templateID: "nlQnAu9FExAF6Zj6j9WR",
        //         userResumeSections: this.userResumeSectionArr,
        //         resumeID: Helper.get(userResume, "resumeID", "")
        //     }
        // }
        const userResumeObj: IUpdateUserResumePayload = {
            urlParam: {
                $resumeId: Helper.get(userResume, "resumeID", "")
            },
            data: {
                userID: userData.userID,
                templateID: "nlQnAu9FExAF6Zj6j9WR",
                //@ts-ignore
                userResumeSections: CreateResumeMock["userResumeSections"],
                resumeID: Helper.get(userResume, "resumeID", "")
            }
        }
        console.log("userResumeObj", userResumeObj);
        updateUserResume(userResumeObj);
        // updateUserResume({ data: temp });

    }

    formDataCollector = (formData: any) => {
        console.log("formData", formData);
        const { templateSections, templateFields } = this.props;
        const templateSectionId = Object.keys(formData)[0];
        const templateSectionFieldsArr: Array<IUserResumeSectionFields> = [];
        const templateSectionObj = templateSections[templateSectionId];
        const userResumeSection: IUserResumeSection = {
            sectionID: templateSectionObj.templateSectionID,
            sectionIndex: templateSectionObj.sectionIndex,
            sectionName: templateSectionObj.defaultSectionName,
            overrideSectionName: templateSectionObj.defaultSectionName,
            description: templateSectionObj.description,
            sectionIconRef: templateSectionObj.sectionIconRef,
            overrideSectionIconRef: templateSectionObj.sectionIconRef,
            helpIconRef: templateSectionObj.helpIconRef,
            overrideHelpIconRef: templateSectionObj.helpIconRef,
            deleteIconRef: templateSectionObj.deleteIconRef,
            overrideDeleteIconRef: templateSectionObj.deleteIconRef,
            associatedCSS: templateSectionObj.associatedCSS,
            overrideAssociatedCSS: templateSectionObj.associatedCSS,
        };
        const formSectionFieldsObj = formData[templateSectionId];
        let isDateRangeStartFound: boolean = false;
        let dateRangeObj: any = {};
        let counter = 0;
        Object.entries(formSectionFieldsObj).forEach((field: Array<any>, index) => {
            const [fieldKey, fieldValue] = field;
            const [ sectionFieldID, fieldID, dateRangeKey ] = fieldKey.split("_");
            if(this.dateRangeField[dateRangeKey] && counter < 4 ){
                isDateRangeStartFound = true
                counter++;
                dateRangeObj[dateRangeKey] = fieldValue;
                if(counter === 4 && isDateRangeStartFound){
                    isDateRangeStartFound = false;
                    counter = 0;
                    templateSectionFieldsArr.push(this.createDateRangeValue(fieldID, templateSectionId, sectionFieldID, dateRangeObj))
                    dateRangeObj = {};
                }
            }
            else{
                templateSectionFieldsArr.push(this.createUpdateResumeField(fieldID, templateSectionId, sectionFieldID, fieldValue));
            }
        })
        userResumeSection.sectionFields = templateSectionFieldsArr;
        this.userResumeSectionArr.push(userResumeSection);
    }

    createDateRangeValue = (fieldID: string, templateSectionId: string, sectionFieldID: string, dateRangeObj: any): IUserResumeSectionFields => {
        let fieldValue = `${dateRangeObj["year-from"]}-${dateRangeObj["month-from"]} : ${dateRangeObj["year-to"]}-${dateRangeObj["month-to"]}`;
        fieldValue = fieldValue === "- : -" ? "" : fieldValue;
        return this.createUpdateResumeField(fieldID, templateSectionId, sectionFieldID, fieldValue);
    }

    createUpdateResumeField = (fieldID: string, templateSectionId: string, sectionFieldID: string, fieldValue: string): IUserResumeSectionFields => {
        const { templateFields } = this.props;
        const fieldObj: ITemplateFields = Helper.get(templateFields, `${fieldID}`, {});
        const _userResumeSectonFields: IUserResumeSectionFields = {
            sectionID: templateSectionId,
            fieldID: fieldID,
            sectionFieldID: sectionFieldID,
            fieldName: fieldObj.fieldName,
            fieldLabel: fieldObj.fieldLabel,
            overrideFieldLabel: fieldObj.fieldLabel,
            fieldLabelFont: fieldObj.fieldLabelFont,
            overrideFieldLabelFont: fieldObj.fieldLabelFont,
            fieldLabelFontSize: fieldObj.fieldLabelFontSize,
            overrideFieldLabelFontSize: fieldObj.fieldLabelFontSize,
            fieldLabelFormatting: fieldObj.fieldLabelFormatting,
            overrideFieldLabelFormatting: fieldObj.fieldLabelFormatting,
            fieldValueText: fieldValue,
            associatedCSS: fieldObj.associatedCSS,
            overrideAssociatedCSS: fieldObj.associatedCSS

        }
        return _userResumeSectonFields
    }
    componentDidMount() {
        const { getTemplatesSection, getTemplateFields, history, createUserResume, userData, toggleLoader } = this.props
        toggleLoader({ loader: true });
        console.log("IComponentProps", history);
        // const template_id = Helper.get(this.props, "match.params.template_id", "nlQnAu9FExAF6Zj6j9WR");
        getTemplatesSection({
            urlParam: {
                "$templateId": "nlQnAu9FExAF6Zj6j9WR"
            }
        })

        getTemplateFields();

        createUserResume({
            data: {
                UserID: userData.userID,
                templateID: "nlQnAu9FExAF6Zj6j9WR"
            }
        })
        // const personalFormFields = this.createPersonalFormFields({});
        // const educationFormFields = this.createEducationFormFields({});
        // this.setState({
        //     personalFormFields: personalFormFields.formFields,
        //     educationFormFields: educationFormFields.formFields,
        //     workFormFields: WorkExpFormFields,
        //     voluntFormFields: VolunterFormFields
        // })
    }

    createPersonalFormFields = (data: any): CreateFormFieldsType => {
        const formFields: FormFields = PersonalFormFields;
        return { formFields }
    }

    createEducationFormFields = (data: any): CreateFormFieldsType => {
        const formFields: FormFields = EducationFormFields;
        return { formFields }
    }

    render() {
        const { className } = this.props;
        const { personalFormFields, educationFormFields, workFormFields, voluntFormFields, forms } = this.state;
        return (
            <Layout>
                <div className={className}>
                    {
                        forms.map((item: IFormProps, index: number) => {
                            return <Form {...item}/>
                        })
                    }
                    <Button btnStyle="btn--blue" labelText="Submit" onClick={this.formSubmitHandler} />

                    {/* <Form formFields={personalFormFields} showSubmitBtn={false} isFileUpload={ true} formHeader={{ centerText: "Personal Information"} } initailValues={{}}/>
                    <Form inheritedStyles={ EducationForm } formFields={educationFormFields} showSubmitBtn={false} formHeader={{ centerText: "Education"} } initailValues={{}}/>
                    <Form inheritedStyles={ EducationForm } formFields={workFormFields} showSubmitBtn={false} formHeader={{ centerText: "Work Experience"} } initailValues={{}}/>
                    <Form inheritedStyles={ EducationForm } formFields={voluntFormFields} showSubmitBtn={false} formHeader={{ centerText: "Volunteering"} } initailValues={{}}/> */}
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (store: AppStore) => ({
    loader: Helper.get(store, 'global.loader', false),
    templateSections: Helper.get(store, 'fillcv.templateSections', {}),
    templateFields: Helper.get(store, 'global.templateFields', []),
    userData: Helper.get(store, 'global.userData', {}),
    userResume: Helper.get(store, 'fillcv.userResume', {}),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getTemplatesSection: (payload: IGetTemplateSectionPayload) => dispatch(getTemplatesSection(payload)),
    getTemplateFields: () => dispatch(getTemplateFields()),
    updateUserResume: (payload: IUpdateUserResumePayload) => dispatch(updateUserResume(payload)),
    createUserResume: (payload: ICreateUserResumePayload) => dispatch(createUserResume(payload)),
    toggleLoader: (payload: Partial<IAppState>) => dispatch(toggleLoader(payload))
})

type DispatchType = typeof mapDispatchToProps;
type SagaType = typeof saga;
type ReducerType = typeof reducer;

export default enhancer<string, DispatchType, ReducerType, SagaType>(injectStyle(FillCv, styles), {
    key: 'fillcv',
    mapStateToProps,
    mapDispatchToProps,
    reducer,
    saga
})