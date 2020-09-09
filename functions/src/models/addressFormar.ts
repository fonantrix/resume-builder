/**
 * AddressFormat
 * Users API for the RecruitBuddy project
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AddressFormatFields } from './addressFormatFields';

export interface AddressFormat { 
    formatID?: string;
    addressFormatName?: string;
    addressFormatDescription?: string;
    addressFormatFields?: Array<AddressFormatFields>;
}