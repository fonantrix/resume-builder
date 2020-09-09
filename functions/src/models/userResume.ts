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
import { UserResumeSection } from './userResumeSection';
import { UserVideo } from './userVideo';

export interface UserResume { 
    userID?: any;
    resumeID?: string;
    templateID?: any;
    createdBy?: string;
    creationDatetime?: string;
    lastUpdatedDateTime?: string;
    userResumeSections?: Array<UserResumeSection>;
    userVideo?: UserVideo;
}