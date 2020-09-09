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
import { TemplateSection } from './templateSection';
import { TemplateType } from './templateType';

export interface Template { 
    templateID?: string;
    templateType?: TemplateType;
    templateName?: string;
    description?: string;
    thumbnailRef?: string;
    author?: string;
    associatedProfessions?: string;
    associatedCSS?: string;
    templateCode?: number;
    createdDateTime?: string;
    lastUpdatedDateTime?: string;
    templateSections?: Array<TemplateSection>;
}