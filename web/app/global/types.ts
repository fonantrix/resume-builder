import { store } from '../app';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { IKeyValue } from '../api/types';

export type CssReturnType = ReturnType<typeof css>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type ReactPureComponentType = typeof React.PureComponent;
export type ReactComponentType = typeof React.Component;
export type StyledReturnType = ReturnType<typeof styled>;
export interface IEnhancerParam<K, D, R, Saga> {
    mapStateToProps: any;
    mapDispatchToProps: D;
    key: K;
    reducer: R;
    saga: Saga;
}

export interface IAction<T, P> {
    type: T;
    payload?: P;
}

export type InputFieldType = 'password' | 'email' | 'text' | 'number' | 'textEditor' | 'dropdown' | 'checkbox' | 'image' | 'DateRange' | 'rating';

export interface IFieldOptions { placeholder?: string, key: string; readonly?: boolean, isRequired?: boolean, validation?: string, list?: any, multiSelect?: boolean, title?: string };

export interface IFormFieldTypes {
    label?: string;
    options: IFieldOptions;
    type: InputFieldType
}

export interface IFormFieldValues extends IKeyValue {

}

export type FormFields = Array<IFormFieldTypes>;
export type CreateFormFieldsType = { formFields: FormFields, formFieldsValue?: IFormFieldValues }

export interface IApiErrorResponse {
    error?: boolean;
    message?: string;
}

export interface ITemplateFieldResponse {
    [key: string]: ITemplateFields;
}

export interface ITemplateFields {
    fieldContentType?: {
        type?: string,
        typeDescription?: string;
        validationRules?: number
    },
    fieldID?: string;
    fieldName?: string;
    fieldLabel?: string;
    fieldLabelFont?: string;
    fieldLabelFontSize?: string;
    fieldLabelFormatting?: string;
    fieldDescription?: string;
    fieldContentFont?: string;
    fieldContentFontSize?: string;
    fieldContentFormatting?: string;
    associatedCSS?: string;
}
