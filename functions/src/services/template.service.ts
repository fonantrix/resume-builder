import { firebase } from './../configurations/firebase';
import * as _ from "lodash";
import { Template } from "./../models/template";
import { TemplateSection } from "./../models/templateSection";
import { TemplateSectionField } from "./../models/templateSectionField";
import { Field } from "./../models/field";
import * as functions from 'firebase-functions';
import { admin } from './../configurations/admin';
import {Path, GET, POST, PathParam, DELETE} from 'typescript-rest';
import Utils from '../utils/utils';

const logger = functions.logger;
const db = firebase.firestore();
// Get a new write batch
const writeBatch = db.batch();

@Path('/templates')
export class TemplateService { 

    /**
     * Create a new template
     * @param Template object
     * @return Template object
    */  
    @POST
    @Path('/template/')
    async createNewTemplate(template:Template):Promise<any> {
      let newTemplate:Template = {};
      return new Promise(async (resolve, reject) => {
          await db.collection('/template').doc().set(template).then(async(doc:any)=>{
              if (doc === null) {
                resolve({thrown:true, status:401,  message: "Unable to create new template"});
                return;
              } else {
                logger.log('createNewTemplate result =', doc);
                newTemplate = doc.data();
                newTemplate.templateID = doc.id;
                resolve({thrown:true, status:200, output: doc}); 
                return;
              }
          })
          .catch ((error:any) => {
            logger.log('createNewTemplate error =', error);
            resolve({thrown:true, status:401,  message: error.message});
            return;
          });
      });
    }

    /**
     * Create a new user
     * @param TemplateSection array object
     * @return Message that sections are created
    */  
    @POST
    @Path('/template/:template_id/sections')    
    async createTemplateSections(templateSections:TemplateSection[]):Promise<any> {
      return new Promise(async (resolve, reject) => {
          const documentRef = db.collection('/templateSections').doc();
          writeBatch.set(documentRef, templateSections);
          logger.log('createTemplateSections result below');
          await writeBatch.commit().then(() => {
            console.log('Successfully executed batch.');
            resolve({thrown:true, status:200, output: 'Sections are created Successfully.'}); 
            return;
          }).catch(err => 
            resolve({thrown:true, status:401, output: err.message})
          );
      });
    }

    /**
     * Create a new user
     * @param TemplateSectionField array object
     * @return Message that sections are created
    */     
    @POST
    @Path('/template/:template_id/sections/:section_id')
    async createTemplateSectionFields(templateSectionFields:TemplateSectionField[]):Promise<any> {
      return new Promise(async (resolve, reject) => {
        const documentRef = db.collection('/templateSectionFields').doc();
        writeBatch.set(documentRef, templateSectionFields);
        logger.log('createTemplateSectionFields result below');
        await writeBatch.commit().then(() => {
          console.log('Successfully executed batch.');
          resolve({thrown:true, status:200, output: 'Section fields are created Successfully.'}); 
          return;
        }).catch(err => 
          resolve({thrown:true, status:401, output: err.message})
        );
      });
    }

    /**
     * Get a default template
     * @return a Template object of "nlQnAu9FExAF6Zj6j9WR" ID
    */     
    @GET
    @Path('/get/')
    async getDefaultTemplate():Promise<any> {
      const id = "nlQnAu9FExAF6Zj6j9WR";
      return new Promise(async (resolve, reject) => {
          await admin.firestore().collection('template').doc(id).get().then((doc:any)=>{
              if (doc === null) {
                  console.log('Default template not available!');
                  resolve({thrown:true, status:401,  message: "no template "+ id +" exist"});
                  return;
              } else {
                logger.log("userRecord", doc);
                let _defaultTemplate:Template;
                _defaultTemplate = doc.data();
                _defaultTemplate.templateID = doc.id;

                resolve({thrown:true, status:200, output: _defaultTemplate});
                return;
              }
          })
          .catch ((error:any) => {
          logger.log('getDefaultTemplate error =', error);
          resolve({thrown:true, status:401,  message: error.message});
          return;
          });
      });
    }

  /**
   * Get all template
   * @return a Template array
  */       
  @GET
  @Path('/')
  async getTemplates():Promise<any> {
      const _templates:any=[];
      return new Promise(async (resolve, reject) => {
          const query = admin.firestore().collection('template').get();
          await query.then(async(snapshot:any) => {
            if (snapshot !== null) {
              snapshot.forEach((doc:any) => {
                logger.log('doc object:', doc);
                  const obj = {
                    ID:doc.id,
                    document:doc.data(),
                  }
                _templates.push(obj);
              });
              resolve({thrown:true, status:200, output: _templates});
              return;
            } else {
              resolve({thrown:true, status:401,  message: "no templates exist"});
              return;
            }
          }).catch ((error:any) => {
            logger.log('getTemplates error =', error);
            resolve({thrown:true, status:error.code,  message: error.message});
            return;
          });
    });
  }    

 /*
  async getTemplateSectionsOnly(id: string):Promise<any> {
      const _templateSections:any=[];
      const templateId = id;
      return new Promise(async (resolve, reject) => {
          const reference = admin.firestore().collection("template").doc(templateId);
          await admin.firestore().collection('templateSections')
          .orderBy("sectionIndex")
          .where("templateID", "==", reference)
          .get()               
          .then(async(snapshot:any) => {
            if (snapshot !== null) {
              snapshot.forEach((doc:any) => {
                logger.log('doc object:', doc);
                  const obj = {
                    document:doc.data(),                    
                    ID:doc.id,
                  }
                  _templateSections.push(obj);
              });
              resolve({thrown:true, status:200, output: _templateSections});
              return;
            } else {
              console.log('Template sections does not exists!');
              resolve({thrown:true, status:401,  message: "no default template sections exist"});
              return;
            }
          }).catch ((error:any) => {
            logger.log('getTemplateSections error =', error);
            resolve({thrown:true, status:error.code,  message: error.message});
            return;
          });
      });
    }*/

    /**
     * Get all sections of a template
     * @param template_id as an identity
     * @return a TemplateSection Object array
    */ 
    @GET
    @Path('/get/sections/:template_id')   
    async getTemplateSections(@PathParam('template_id')template_id: string):Promise<any> {
      const _templateSections:any=[];
      const templateId = template_id;
      let _templateSection:TemplateSection={};
      return new Promise(async (resolve, reject) => {
          const reference = admin.firestore().collection("template").doc(templateId);
          await admin.firestore().collection('templateSections')
          .orderBy("sectionIndex")
          .where("templateID", "==", reference)
          .get()               
          .then(async(snapshot:any) => {
            if (snapshot !== null) {
              snapshot.forEach((doc:any) => {
                  if (_templateSection) {
                    _templateSection = doc.data();
                    _templateSection.templateSectionID = doc.id;
                  }
                  _templateSections.push(_templateSection);
              });
              resolve({thrown:true, status:200, output: _templateSections});
              return;
            } else {
              resolve({thrown:true, status:401,  message: "no default template sections exist"});
              return;
            }
          }).catch ((error:any) => {
            logger.log('getTemplateSections error =', error);
            resolve({thrown:true, status:error.code ,  message: error.message});
            return;
          });
      });
    }

    /**
     * Get all fields of a section
     * @param section_id as an identity
     * @return a TemplateSectionField object array
    */     
    @GET
    @Path('/get/section/:section_id')     
    async getTemplateSectionFields(@PathParam('section_id')section_id: string):Promise<any> {
      const _sectionFields:any=[];
      const sectionId = section_id;
      let _templateSectionField:TemplateSectionField ={};
      return new Promise(async (resolve, reject) => {
        // Create a reference to the specific document you want to search with
        const reference = admin.firestore().collection("templateSections").doc(sectionId);
        logger.log('reference object:', reference);
        await admin.firestore().collection('templateSectionFields')
        .orderBy("fieldIndex")
        .where("sectionID", "==", reference)
        .get()               
        .then(async(snapshot:any) => {
          if (snapshot !== null) {
            snapshot.forEach((doc:any) => {         
              if (_templateSectionField) {
                _templateSectionField = doc.data();
                _templateSectionField.templateSectionFieldID = doc.id;
              }
              _sectionFields.push(_templateSectionField);
              logger.log("_sectionFields inside", _sectionFields.length);
            });
            logger.log("_sectionFields", _sectionFields.length);
            resolve({thrown:true, status:200, output: _sectionFields});
            return;
          } else {
            console.log('Template section fields does not exists!');
            resolve({thrown:true, status:401,  message: "no default template section fields exist"});
            return;
          }
        })
        .catch ((error:any) => {
          logger.log('_getUserResumeSectionFields error =', error);
          resolve({thrown:true, status:error.code ,  message: error.message});
          return;
        });
      });
    }

    /**
     * Get all fields used in template
     * @return a Field object array
    */    
    @GET
    @Path('/get/fields/')
    async getAllFields():Promise<any> {
      let _field:Field ={};
      const _fields:any=[];
      return new Promise(async (resolve, reject) => {
          await admin.firestore().collection('field').get()               
          .then(async(snapshot:any) => {
            if (snapshot !== null) {
              snapshot.forEach(async (doc:any) => {
                if (_field) {
                  _field = doc.data();
                  _field.fieldID = doc.id;                  
                }
                _fields.push(_field);
              });
              resolve({thrown:true, status:200, output: _fields});
              return;
            } else {
              console.log('Template section fields does not exists!');
              resolve({thrown:true, status:401,  message: "no default template section fields exist"});
              return;
            }
          }).catch ((error: any) => {
            logger.log('getAllFields error =', error);
            resolve({thrown:true, status:error.code,  message: error.message});
            return;
          });
      });
    }     

  /**
   * Delete an existing template
   * @param Template id as string
   * @return message or error
  */
 @DELETE
 @Path('/:template_id')  
  async deleteTemplate(@PathParam('template_id')template_id: string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const templateRef = db.collection('/template').doc(template_id);
        const batchSize:number = 50
        const collectionRef1 = db.collection('/templateSections').where("templateID", "==", templateRef);
        
        const snapshot = collectionRef1.get();
        for (const doc of (await snapshot).docs) {
          const collectionRef = db.collection('/templateSections').doc(doc.id).collection('/templateSectionFields')
          const query = collectionRef.limit(batchSize);
          await Utils.deleteQueryBatch(query);
        }
        const query1 = collectionRef1.limit(batchSize);
        await Utils.deleteQueryBatch(query1);
        const res = db.collection('/template').doc(template_id).delete();
        resolve({thrown:true, status:200, output: 'Successfully executed batch.' + res}); 
        return;
      } catch (error) {
        logger.log('deleteUserResume error =', error);
        resolve({thrown:true, status:401, output: error.message})
        return;
      }
    });
  }    
}