import { FormFields } from "../../../global/types";
import { VALIDATION } from "../../../global/constant";

export const UPDATE_PROFILE = 'update_profile';

export const UPDATE_PROFILE_FIELD = 'update_profile_field';

export const ProfileFormFields: FormFields = [
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
        label: 'Title before',
        options: {
            placeholder: `Title before`,
            key: 'nameSuffix',
            isRequired: true,
        },
        type: 'text'
    },
    {
        label: 'Title after',
        options: {
            placeholder: `Title after`,
            key: 'title',
            isRequired: true,
        },
        type: 'text'
    },
    {
        label: 'Phone number',
        options: {
            placeholder: `Phone number`,
            key: 'mobile',
            isRequired: true,
            validation: VALIDATION.MOBILE_NO
        },
        type: 'number'
    },
    {
        label: 'Email address',
        options: {
            placeholder: `Email address`,
            key: 'emailAddress',
            isRequired: true,
            validation: VALIDATION.EMAIL
        },
        type: 'email'
    },
    {
        label: 'Birth date',
        options: {
            placeholder: `Birth date`,
            key: 'dateOfBirth',
            isRequired: true,
        },
        type: 'text'
    },
    {
        label: 'Nationality',
        options: {
            placeholder: `Nationality`,
            key: 'nationality',
        },
        type: 'text'
    },
    {
        label: 'Street, number',
        options: {
            placeholder: `Street, number`,
            key: 'streetNumber',
        },
        type: 'text'
    },
    {
        label: 'City',
        options: {
            placeholder: `City`,
            key: 'city',
        },
        type: 'text'
    },
    {
        label: 'Postal code',
        options: {
            placeholder: `Postal code`,
            key: 'postalCode',
        },
        type: 'text'
    },
    {
        label: 'Country',
        options: {
            placeholder: `Country`,
            key: 'country',
        },
        type: 'text'
    },
    {
        label: 'Website',
        options: {
            placeholder: `Website`,
            key: 'website',
        },
        type: 'text'
    },
    {
        label: 'Profile',
        options: {
            key: 'profileText',
        },
        type: 'textEditor'
    },
]