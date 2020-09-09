import * as express from 'express';
import { UserResumeService } from '../services/user.resume.service';
import * as functions from 'firebase-functions';
import {ResponseHandler} from '../utils/responseHandler';
import {IResponseHandler} from '../utils/types/responseHandler';
import {UserResume} from '../models/userResume';
import {UserResumeRequest} from '../models/userResumeRequest';
import {UserResumeSection} from '../models/userResumeSection';
import {UserSectionFields} from '../models/userSectionFields';


const logger = functions.logger;

class UserResumeController {

    //creating service
    userResumeService = new UserResumeService();
    controllerResponse:IResponseHandler;

    //API Route for this controller
    public path = '/user/resumes';
    public router = express.Router();
  
    //controller constructor
    constructor() {
      this.intializeRoutes();
      this.controllerResponse = new ResponseHandler();
    } 
  
    public intializeRoutes() {
        this.router.post(this.path, this.createNewResume);
        this.router.post(this.path+"/:resume_id/sections", this.createResumeSections);
        this.router.post(this.path+"/:resume_id/sections/:section_id/sectionFields", this.createResumeSectionFields);
        this.router.put(this.path+"/:resume_id", this.updateUserResume);
        this.router.delete(this.path+"/:resume_id", this.deleteUserResume);
        this.router.get(this.path+"/:user_id", this.getUserResumes);
        this.router.get(this.path+"/get/:resume_id", this.getUserResume);
        this.router.get(this.path+"/templates/:user_id", this.getUserTemplates);
        this.router.get(this.path+"/get/:resume_id/sections", this.getUserResumeSections);
        this.router.get(this.path+"/{doctype}/:resume_id/",this.getUserResumePDF);
        this.router.get(this.path+"/get/:resume_id/sections/:section_id/fields", this.getUserResumeSectionFields);
    } 
  
    getUserResumePDF = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.params.resume_id;
        const doctype = req.params.doctype;
        const result = await this.userResumeService.getResumePDF(resumeid,doctype);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status, resumeid ,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    createNewResume = async (req: express.Request, res: express.Response) => {
        try {
          const userResumeRequest = req.body as UserResumeRequest;
          const result = await this.userResumeService.createNewResume(userResumeRequest);
          if (result.status === 200 ) {
            this.controllerResponse.sendMessageResponse(result.status,result.output,res);
          } else {
            this.controllerResponse.sendError(result.status, res, result.message);
          }
        } catch (error) {
          console.error(error);
          this.controllerResponse.sendError(500, res, null, error.message);
        }     
    }

    createResumeSections = async (req: express.Request, res: express.Response) => {
      try {
        const userResumeSections:UserResumeSection[] = req.body.userResumeSections as UserResumeSection[];
        const resumeid = req.body.resume_id;
        const result = await this.userResumeService.createResumeSections(userResumeSections,resumeid);
        if (result.status === 200 ) {
          this.controllerResponse.sendMessageResponse(result.status,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    createResumeSectionFields = async (req: express.Request, res: express.Response) => {
      try {
        const userSectionFields:UserSectionFields[] = req.body.userResumeSectionFields as UserSectionFields[];
        const resumeid = req.body.resume_id;
        const sectionid = req.body.section_id;
        const result = await this.userResumeService.createResumeSectionFields(userSectionFields,resumeid,sectionid);
        if (result.status === 200 ) {
          this.controllerResponse.sendMessageResponse(result.status,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }    

    updateUserResume = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.params.resume_id;
        const userResume = req.body as UserResume;
        const result = await this.userResumeService.updateResume(userResume, resumeid);
        if (result.status === 200 ) {
          this.controllerResponse.sendMessageResponse(result.status,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    deleteUserResume = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.body.resume_id;
        const result = await this.userResumeService.deleteUserResume(resumeid);
        if (result.status === 200 ) {
          this.controllerResponse.sendMessageResponse(result.status,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    getUserResumes = async (req: express.Request, res: express.Response) => {
      try {
        const userid = req.params.user_id;
        logger.log("#########" + userid);
        const result = await this.userResumeService.getUserResumes(userid);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.ID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }
    
    getUserResume = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.params.resume_id;
        const result = await this.userResumeService.getUserResume(resumeid);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.ID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }
    
    getUserResumeSections = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.params.resume_id;
        const result = await this.userResumeService.getUserResumeSections(resumeid);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.ID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    getUserResumeSectionFields = async (req: express.Request, res: express.Response) => {
      try {
        const resumeid = req.params.resume_id;
        const sectionid = req.params.section_id;
        const result = await this.userResumeService.getUserResumeSectionFields(resumeid,sectionid);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.ID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }

    getUserTemplates = async (req: express.Request, res: express.Response) => {
      try {
        const userid = req.params.user_id;
        const result = await this.userResumeService.getUserTemplates(userid);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.ID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }    
  }
   
  export default UserResumeController;