import { FormFields, IFormFieldTypes, IFieldOptions, InputFieldType } from "../../../global/types";
import { VALIDATION } from "../../../global/constant";
import { IOption } from "../../atoms/Dropdown/types";
import { IKeyValue } from "../../../api/types";

export const GET_TEMPLATE_SECTION = "get_template_section";
export const SAVE_TEMPLATE_SECTION = "save_templage_section";
export const CREATE_USER_RESUME = "create_user_resume";
export const UPDATE_USER_RESUME = "update_user_resume";
export const SAVE_USER_RESUME = "save_user_resume";

export const MonthDropdown: Array<IOption> = [{ name: 'January', value: "01", isSelected: true }, { name: 'February', value: "02", isSelected: false }, { name: 'March', value: "03", isSelected: false },{ name: 'April', value: "04", isSelected: false },{ name: 'May', value: "05", isSelected: false },{ name: 'June', value: "06", isSelected: false },{ name: 'July', value: "07", isSelected: false },{ name: 'August', value: "08", isSelected: false },{ name: 'September', value: "09", isSelected: false },{ name: 'October', value: "10", isSelected: false },{ name: 'November', value: "11", isSelected: false }, { name: 'December', value: "12", isSelected: false }]

export const YearDropdown: Array<IOption> = [{ name: '1930', value: "1930", isSelected: true }, { name: '1931', value: "1931", isSelected: false }, { name: '1932', value: "1932", isSelected: false },{ name: '1933', value: "1933", isSelected: false },{ name: '1934', value: "1934", isSelected: false },{ name: '1935', value: "1935", isSelected: false }]

export const SkillLevel: Array<IOption> = [{ name: 'Elementary', value: "Elementary", isSelected: true }, { name: 'Limited', value: "Limited", isSelected: false }, { name: 'Professional', value: "Professional", isSelected: false },{ name: 'Full', value: "Full", isSelected: false }, { name: 'Native', value: "Native", isSelected: false }]

export const PersonalFormFields: FormFields = [
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
            key: 'titleBefore',
            isRequired: true,
        },
        type: 'text'
    },
    {
        label: 'Title after',
        options: {
            placeholder: `Title after`,
            key: 'titleAfter',
            isRequired: true,
        },
        type: 'text'
    },
    {
        label: 'Phone number',
        options: {
            placeholder: `Phone number`,
            key: 'phone',
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
            key: 'birthDate',
            isRequired: true,
        },
        type: 'number'
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
            key: 'street',
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
            key: 'profile',
        },
        type: 'textEditor'
    },
]

export const EducationFormFields: FormFields = [
    {
        label: 'Institution name',
        options: {
            placeholder: `Institution name`,
            key: 'institutionName',
        },
        type: 'text'
    },
    {
        label: 'Field of study',
        options: {
            placeholder: `Field of study`,
            key: 'fieldStudy',
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
        label: 'Country',
        options: {
            placeholder: `Country`,
            key: 'country',
        },
        type: 'text'
    },
    {
        label: 'Description',
        options: {
            key: 'description',
        },
        type: 'textEditor'
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'startMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'startYear',
            title: "Select Year",
        }
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'endMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'endYear',
            title: "Select Year",
        }
    },
]

export const WorkExpFormFields: FormFields = [
    {
        label: 'Company Name',
        options: {
            placeholder: `Company Name`,
            key: 'companyName',
        },
        type: 'text'
    },
    {
        label: 'Job title',
        options: {
            placeholder: `Job title`,
            key: 'jobTitle',
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
        label: 'Country',
        options: {
            placeholder: `Country`,
            key: 'country',
        },
        type: 'text'
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'startMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'startYear',
            title: "Select Year",
        }
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'endMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'endYear',
            title: "Select Year",
        }
    },
    {
        label: 'Description',
        options: {
            key: 'description',
        },
        type: 'textEditor'
    },
]

export const VolunterFormFields: FormFields = [
    {
        label: 'Institution name',
        options: {
            placeholder: `Institution name`,
            key: 'instName',
        },
        type: 'text'
    },
    {
        label: 'Role',
        options: {
            placeholder: `Role`,
            key: 'role',
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
        label: 'Country',
        options: {
            placeholder: `Country`,
            key: 'country',
        },
        type: 'text'
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'startMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'startYear',
            title: "Select Year",
        }
    },
    {
        type: 'dropdown',
        label: "Month",
        options: {
            multiSelect: false,
            list: MonthDropdown,
            key: 'endMonth',
            title: "Select Month",
        }
    },
    {
        type: 'dropdown',
        label: "Year",
        options: {
            multiSelect: false,
            list: YearDropdown,
            key: 'endYear',
            title: "Select Year",
        }
    },
    {
        label: 'Description',
        options: {
            key: 'description',
        },
        type: 'textEditor'
    },
]

export const FieldTypeConfig: { [key: string]: IFieldTypeConfig } = {
    "Company Name": {
        type: "text",
    },
    "Achievements Summary": {
        type: "textEditor",
    },
    "Job Title": {
        type: "text",
    },
    "Country": {
        type: "text",
    },
    "City": {
        type: "text",
    },
    "summary": {
        type: "text",
    },
    "Institution name": {
        type: "text",
    },
    "Field of study": {
        type: "text",
    },
    "Social Description": {
        type: "textEditor" 
    },
    "Education Summary": {
        type: "textEditor"
    },
    "Profile Summary": {
        type: "textEditor"
    },
    "Text Summary": {
        type: "textEditor"
    },
    "Certification Summary": {
        type: "textEditor"
    },
    "Award Summary": {
        type: "textEditor"
    },
    "Reference Summary": {
        type: "textEditor"
    },
    "Volunteering Summary": {
        type: "textEditor"
    }
}

export const SectionTypeConfig: any = {
    "Personal info": {
        isFileUpload: true
    }
}

interface IFieldTypeConfig extends Partial<IFieldOptions>, Partial<IFormFieldTypes> {
    
}

export const TemplateFieldTypeConfig: {[key: string]: InputFieldType} = {
    number: "number",
    String: "text",
    Boolean: "checkbox",
    image: "image",
    htmlstring: "textEditor",
    DateRange: "dropdown",
    rating: "rating",
}