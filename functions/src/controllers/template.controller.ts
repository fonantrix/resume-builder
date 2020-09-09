import * as express from 'express';
import { TemplateService } from './../services/template.service';
import { Template } from "./../models/template";
import { TemplateSection } from "./../models/templateSection";
import { TemplateSectionField } from "./../models/templateSectionField";
import * as functions from 'firebase-functions';
import {ResponseHandler} from './../utils/responseHandler';
import {IResponseHandler} from './../utils/types/responseHandler';

const logger = functions.logger;

class TemplateController {

    //creating service
    templateService = new TemplateService();
    controllerResponse:IResponseHandler;

    //API Route for this controllewr
    public path = '/templates';
    public router = express.Router();
  
    //controller constructor
    constructor() {
      this.intializeRoutes();
      this.controllerResponse = new ResponseHandler();
    } 
  
    public intializeRoutes() {
        this.router.get(this.path+"/get/sections/:template_id", this.getSections);
        this.router.get(this.path+"/get/", this.getTemplate);
        this.router.get(this.path+"/", this.getTemplates);
        this.router.get(this.path+"/get/section/:section_id", this.getSectionFields);
        this.router.get(this.path+"/get/fields/", this.getAllFields);
        this.router.delete(this.path+"/:template_id", this.deleteTemplate);
        this.router.post(this.path+"/template/", this.createNewTemplate);
        this.router.post(this.path+"/template/:template_id/sections", this.createTemplateSections);
        this.router.post(this.path+"/template/:template_id/sections/:section_id", this.createTemplateSectionFields);
    } 

    deleteTemplate = async (req: express.Request, res: express.Response) => {
      try {
        logger.log('createNewTemplate call with request =', req);
        const id = req.params.template_id;  
        const result = await this.templateService.deleteTemplate(id)
        if (result.status === 200 ) {
          this.controllerResponse.sendMessageResponse(result.status,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }
    };    
  
    createNewTemplate = async (req: express.Request, res: express.Response) => {
      try {
        logger.log('createNewTemplate call with request =', req);
        const template = req.body.template as Template;         
        const result = await this.templateService.createNewTemplate(template)
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }
    };

    createTemplateSections = async (req: express.Request, res: express.Response) => {
      try {
        logger.log('createTemplateSections call with request =', req);
        const templateSections = req.body.templateSections as TemplateSection[];
        const result = await this.templateService.createTemplateSections(templateSections)
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }
    };

    createTemplateSectionFields = async (req: express.Request, res: express.Response) => {
      try {
        logger.log('createTemplateSectionFields call with request =', req);
        const templateSectionFields = req.body.templateSectionFields as TemplateSectionField[];
        const result = await this.templateService.createTemplateSectionFields(templateSectionFields)
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }
    };

    getTemplate = async (req: express.Request, res: express.Response) => {
        try {
          const result = await this.templateService.getDefaultTemplate();
          if (result.status === 200 ) {
            this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
          } else {
            this.controllerResponse.sendError(result.status, res, result.message);
          }
        } catch (error) {
          console.error(error);
          this.controllerResponse.sendError(500, res, null, error.message);
        }
    }

    getTemplates = async (req: express.Request, res: express.Response) => {
      try {
        const result = await this.templateService.getTemplates();
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
    }    

    getSections = async (req: express.Request, res: express.Response) => {
        try {
          const id = req.params.template_id;
          const result = await this.templateService.getTemplateSections(id);
          const _templateSections: Array<TemplateSection> = result.output;
          let resultSection:any = {};
          //looping
          for (const _templateSection of _templateSections) {
            const sectionid = _templateSection.templateSectionID!;
            if (sectionid) {
              resultSection = await this.templateService.getTemplateSectionFields(sectionid);
              const _templateSectionFields: Array<TemplateSectionField> = resultSection.output;
              _templateSection.templateSectionFields = _templateSectionFields;              
            }
          }
          if (result.status && resultSection.status === 200 ) {
            this.controllerResponse.sendResponse(result.status,id,_templateSections,res);
          } else {
            this.controllerResponse.sendError(result.status, res, result.message);
          }
        } catch (error) {
          console.error("getSectionsgetSections" , error);
          this.controllerResponse.sendError(500, res, null, error.message);
        }     
    }    

    getSectionFields = async (req: express.Request, res: express.Response) => {
        try {
          const id = req.params.section_id;
          const result = await this.templateService.getTemplateSectionFields(id);
          if (result.status === 200 ) {
            this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
          } else {
            this.controllerResponse.sendError(result.status, res, result.message);
          }
        } catch (error) {
          console.error(error);
          this.controllerResponse.sendError(500, res, null, error.message);
        }     
    }

    getAllFields = async (req: express.Request, res: express.Response) => {
      try {
        logger.log('getAllFields result object:');
        const result = await this.templateService.getAllFields();
        //logger.log('getAllFields result object:', result);
        if (result.status === 200 ) {
          this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
        } else {
          this.controllerResponse.sendError(result.status, res, result.message);
        }
      } catch (error) {
        console.error(error);
        this.controllerResponse.sendError(500, res, null, error.message);
      }     
  }     
  }
   
  export default TemplateController;