/**
 * Users API
 * Users API for the RecruitBuddy project
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Field } from './field';

export interface TemplateSectionField { 
    templateSectionFieldID?: string;
    fieldIndex?: number;
    field?: Field;
    maxLenth?: number;
    minLength?: number;
    sectionID?: string;
    defaultInput?: string;
    templateFieldMnemonic?: string;
}