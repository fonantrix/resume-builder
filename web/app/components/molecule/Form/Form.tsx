import * as React from 'react';
import styles, { UploadWrapper, FileBgImage, FormHeader, Wrapper } from './Form.style';
import injectStyles from '../../../utils/injectStyles';
import Input from '../../atoms/Input';
import { IFormComponentProps } from './types';
import { IFieldOptions, FormFields } from '../../../global/types';
import { FormConstant } from '../../../constants';
import { Helper } from '../../../utils/Helper';
import { VALIDATION } from '../../../global/constant';
import Button from '../../atoms/Button';
import BackgroundImage from '../../atoms/BackgroundImage';
import TextEditor from '../../atoms/TextEditor';
import { IOption } from '../../atoms/Dropdown/types';
import Dropdown from '../../atoms/Dropdown';

const Form: React.FC<IFormComponentProps> = React.forwardRef((props: IFormComponentProps, forwardedRef: React.RefObject<HTMLFormElement>) => {
// const Form: React.FC<IFormComponentProps> = (props: IFormComponentProps) => {
    const { className, onSubmit, formFields, heading, initailValues, buttonText = "Submit", isFileUpload = false, fileUpload, showSubmitBtn = true, formHeader = null, imageUrl, submitVisibility = "visible" } = props;

    const [formFieldsValue, setFormFieldValue] = React.useState<any>(initailValues || {});

    const [formValidity, setFormValidity] = React.useState<any>({});

    const inputFilePicker = React.createRef<HTMLInputElement>();

    const validateForm = (formFieldsValue: any = {}, formFields: FormFields) => {
        let isValid = true;
        let errorFields: any = {};
        const keys = Object.keys(formFieldsValue);
        // if (!keys.length) {
        //     return false;
        // }
        formFields.forEach((value) => {
            const { options: { validation, key, isRequired, readonly }, label } = value;
            const formValue = formFieldsValue[key];

            if (isRequired && ((!formValue && formValue !== 0) || (Array.isArray(formValue) && !formValue.length))) {
                errorFields[key] = `${FormConstant.FORM_REQUIRED} ${label}`;
            } else {
                switch (validation) {
                    case VALIDATION.EMAIL:
                        isValid = Helper.verifyEmail(formValue);
                        if (!isValid) {
                            errorFields[key] = `${FormConstant.FORM_CORRECT} ${label}`;
                        }
                        break;
                    case VALIDATION.PASSWORD:
                        // To Do: password policy
                        isValid = true;
                        break;
                    default: {
                        if (typeof (formValue) == "undefined" && isRequired) {
                            errorFields[key] = `${FormConstant.FORM_REQUIRED} ${label}`;
                        }
                    }
                }
            }
        });
        return errorFields;
    }

    const createField = (type: string, options: IFieldOptions, index: number): React.ReactElement => {
        switch (type) {
            case "text":
            case "email":
            case "number":
            case 'password':
                const inputProps = {
                    type, name: options.key, readOnly: options.readonly, placeholder: options.placeholder, onChangeHandler: (value: string) => assignValue(value, options.key), key: index,
                    errorMessage: formValidity[options.key],
                    value: formFieldsValue[options.key] || ''
                }
                return <Input {...inputProps} />;
            case "textEditor":
                const txtEditorProps = {
                    onChangeHandler: (value: string) =>  { assignValue(value, options.key) }, key: index,
                    inputVal: formFieldsValue[options.key] || ''
                }
                return <TextEditor {...txtEditorProps}/>;
            case "dropdown":
                // if(!Array.isArray(formFieldsValue[options.key])){
                //     formFieldsValue[options.key] = [formFieldsValue[options.key]];
                //   }
                const selectedValues: Array<string> = [];
                const selectedObj: Array<IOption> = (options.list || []).filter((item: IOption) => selectedValues.indexOf(item.value) !== -1);
                const initialSelected = (options.list || []).filter((item: IOption) => item.isSelected);
                const getInitialSelectedValues = initialSelected ? initialSelected.map((item: IOption) => item.name).join(',') : null;
                const isSelectedObj = selectedObj.length ? selectedObj.map((item: IOption) => item.name).join(',') : getInitialSelectedValues;
                const singleItemDefaultValue = selectedObj.length ? selectedObj[0].name : getInitialSelectedValues;
                //   const defaultValue = setSingleItem ? singleItemDefaultValue : isSelectedObj;
                return <Dropdown
                    selectedOptions={(selectedOptions: string) => { assignValue(selectedOptions, options.key) }}
                    options={options.list}
                    initialSelected={initialSelected}
                    key='name'
                    title={options.title}
                    errorMessage={formValidity[options.key]} />
        }
    }

    React.useEffect(() => {
        setFormFieldValue(initailValues);
    }, [initailValues]);

    const assignValue = (value: string, key: string) => {
        const formValues = { ...formFieldsValue };
        formValues[key] = value;
        setFormFieldValue(formValues);
    }

    const formHandle = (event: React.FormEvent) => {
        event.stopPropagation();
        const formValidation = validateForm(formFieldsValue, formFields);
        setFormValidity(formValidation);

        if (!Object.keys(formValidation).length) {
            onSubmit(formFieldsValue);
        }
    }

    const formSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        formHandle(event);
        return false;
    }

    const filePickerHandler = (): void => {
        inputFilePicker.current.click();
    }

    const filePickerChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.target.files[0];
        console.log("fileUploaded", file);
        fileUpload(file);
    }

    const buttonProps = { type: "submit", value: buttonText };
    const fileProps = {
        type: "file", name: "file"
    }
    return (
        <div className={className}>
            {heading && <h3>{heading}</h3>}
            {
                formHeader && 
                <FormHeader>
                    <img src={formHeader.leftContent} />
                    <span>{formHeader.centerText}</span>
                </FormHeader>
            }
            <Wrapper>
            {isFileUpload && <UploadWrapper>
                <Input ref={inputFilePicker} {...fileProps} style={{ display: "none" }} onChange={filePickerChangeHandler} />
                <BackgroundImage inheritedStyles={FileBgImage} imageUrl={imageUrl || "https://s3-eu-west-1.amazonaws.com/avatars-kickresume-com/default-avatars/user.png"} />
                <Button btnStyle="btn--blue" labelText="Change Image" onClick={filePickerHandler} />
            </UploadWrapper>
            }
            <form ref={forwardedRef} onSubmit={formSubmit}>

                {
                    formFields.map(({ label, options, type }, index) => {
                        return (
                            <>
                                {
                                    label && <label key={`${index}-1`} htmlFor={options.key}>{label}{options.isRequired ? "*" : null}</label>}
                                {createField(type, options, index)}
                            </>
                        )
                    })
                }
                {showSubmitBtn && <Input {...buttonProps} style={{"visibility": submitVisibility}} />}
            </form>
            </Wrapper>
        </div>
    )
})

export default injectStyles(Form, styles)