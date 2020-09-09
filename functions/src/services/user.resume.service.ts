import { firebase } from '../configurations/firebase';
import * as _ from "lodash";
import * as functions from 'firebase-functions';
import { bucket } from '../configurations/admin';
import {UserResume} from '../models/userResume';
import { admin } from './../configurations/admin';
import {UserResumeSection} from '../models/userResumeSection';
import {UserSectionFields} from '../models/userSectionFields';
import {UserResumeRequest} from '../models/userResumeRequest';
import { UserTemplate } from '../models/models';
import Utils from '../utils/utils';
import FileUtils from '../utils/fileUtils';
import {Path, GET, POST, PathParam, PUT, DELETE} from 'typescript-rest';
// @ts-ignore
const pdf = require('html-pdf');
const path = require('path');
//const os = require('os');
const fs = require('fs');
const Handlebars = require("handlebars");
(global as any).XMLHttpRequest = require('xhr2');

const logger = functions.logger;
const db = firebase.firestore();
// Get a new write batch
const writeBatch = db.batch();

@Path('/user/resumes')
export class UserResumeService { 

  public timestamp:any = firebase.firestore.FieldValue.serverTimestamp();


/**
 * Create a new user resume
 * @param UserResumeRequest object
 * @return userResume Object
*/ 
@GET
@Path('/{doctype}/:resume_id/')
async getResumePDF(@PathParam('resume_id')resume_id:string,@PathParam('doctype')doctype:string):Promise<any> {
  return new Promise(async (resolve, reject) => {
    let userResume:UserResume | undefined = {};
    const result = await this.getUserResume(resume_id);
    userResume = result.output;    
    const uploadPath = "users/" + userResume?.userID._path.segments[1];
    if (doctype === "HTML") {
      await this._getResumeHTML(uploadPath, 'output.html', resume_id).then(() => {
        //call html
      });
    } else if (doctype === "PDF") {
      logger.log('path =', `${userResume?.userID}`);
      await FileUtils.verifyFileExist(uploadPath, "pdf", 'output.pdf', resume_id).then((fileExist) => {
        logger.log ("value of verifyFileExist", fileExist);
        if (fileExist) {
          logger.log("pdf already exists");
          const pdfFilePath = uploadPath + "/pdf/" + resume_id + "/output.pdf";
          resolve({thrown:true, status:200, output: pdfFilePath}); 
        } else {
          //await this._getResumeHTML(uploadPath, "html", 'output.html', resume_id).then(() => {
            const localPDFFile = path.join(process.cwd(),"temp",'output.pdf');
            const localHTMLFile = path.join(process.cwd(),"temp",'output.html');
            const localAssetsPath = path.join(process.cwd(),"temp");
            //write logic for generating pdf 
            const options = {
              "height": "11.25in",
              "width": "8.5in",
              "header": {
                  "height": "20mm"
              },
              "footer": {
                  "height": "20mm",
              },
              "base": `file:///${localAssetsPath}/`
            };
            const htmlFilePath = uploadPath + "/html/" + resume_id + "/";
            bucket.getFiles({ directory: htmlFilePath, autoPaginate:false }, async function(err:any, files:any) {
              if (err) {
                logger.log('download error =', err);
                resolve({thrown:true, status:401,  message: err.message + "Error while downloading data"});                
              }
              // files is an array of File objects.
              FileUtils.downloadFolder(files, htmlFilePath).then(() => {
                logger.log("localTemplate ###", localHTMLFile);
                  const html = fs.readFileSync(localHTMLFile, 'utf8');   
                  pdf.create(html, options).toFile(localPDFFile, function(error:any, res:any) {
                    if (error){
                      logger.log(error);
                      resolve({thrown:true, status:401,  message: error.message + "Issue while getting PDF"});
                      return;
                    }
                    logger.log("pdf created locally");
                    const pdfUploadPath = `${uploadPath}/pdf/${resume_id}/`;
                    FileUtils.fileUpload(pdfUploadPath, localPDFFile).then((pdfPath)=>{
                      logger.log('pdf path =', pdfPath);
                      resolve({thrown:true, status:200, output:pdfPath}); 
                    }).catch((err1) => {
                      logger.log('fileUpload error =', err1);
                      resolve({thrown:true, status:401,  message: err1.message + "Issue while getting PDF"});
                    });
                  });
              }).catch((error:any) => {
                logger.log('download files error =');
                resolve({thrown:true, status:401,  message: "Error while downloading data"});
              });
            });
        }
      });
    }
  });
}


/**
 * Create a new user resume
 * @param UserResumeRequest object
 * @return userResume Object
*/ 
@POST
  async createNewResume(userResumeRequest:UserResumeRequest):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const userResume:UserResume | undefined = {};
      const strCollectionTemplateID = userResumeRequest.templateID!;
      if (typeof strCollectionTemplateID === "string") {
        const userReference = db.doc('/users/'+strCollectionTemplateID);
        userResume.userID = userReference;
      }
      if (typeof userResumeRequest.templateID! === "string") {
        const templateReference = db.doc('/template/' + userResumeRequest.templateID);
        userResume.templateID = templateReference;
      }
      if (typeof userResume.createdBy! === null) {
        userResume.createdBy = "Bernard";
      }
      userResume.creationDatetime = this.timestamp;
      userResume.lastUpdatedDateTime = this.timestamp;
      await db.collection('userResumeRequest').add(userResumeRequest).then(async(doc:any)=>{
        if (doc !== null) {
          await db.collection('userResume').add(userResume).then(async(doc1:any)=>{
              if (doc1 === null) {
                resolve({thrown:true, status:401,  message: "Unable to create user's resume with id :"+userResumeRequest.templateID});
                return;
              } else {
                try {
                  await Utils.copySpecificTemplateSectionToUserResumeSections("templateSections", strCollectionTemplateID, "userResume", doc1.id, "userResumeSections");
                } catch (error) {
                    logger.log('createNewResume error =', error);
                    resolve({thrown:true, status:error.code ,  message: error.message});
                    return;        
                }
                logger.log("new collection id" + doc1.id);
                const _userResume:any = await this.getUserResume(doc1.id);
                logger.log("collection ###" + _userResume);                
                resolve({thrown:true, status:200, output: _userResume}); 
                return;
              }
          });
        } else {
          resolve({thrown:true, status:401,  message: "userResumeRequest not added "+ userResumeRequest.templateID +", " + userResumeRequest.UserID});
          return;
        }
      })
      .catch ((error:any) => {
        logger.log('createNewResume error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      }); 
    });
  }

/**
 * Create a user resume sections
 * @param UserResumeSection array object without fields
 * @return a message on success
*/
@POST
@Path(':resume_id/sections') 
  async createResumeSections(newUserResumesections:UserResumeSection[], @PathParam('resume_id')resume_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const documentRef = db.collection('/userResume').doc(resume_id).collection('/userResumeSections').doc();
      writeBatch.set(documentRef, newUserResumesections);
      logger.log('createResumeSections result =');
      await writeBatch.commit().then(() => {
        console.log('Successfully executed batch.');
        resolve({thrown:true, status:200, output: 'Successfully executed batch.'}); 
        return;
      }).catch(err => 
        resolve({thrown:true, status:401, output: err.message})
      );
    });
  }

/**
 * Create a user resume section fields
 * @param UserSectionFields array object
 * @return a message on success
*/
@POST
@Path(':resume_id/sections/:section_id/sectionFields') 
  async createResumeSectionFields(newUserResumeSectionFields:UserSectionFields[], @PathParam('resume_id')resume_id:string, @PathParam('section_id')section_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const documentRef = db.collection('/userResume').doc(resume_id).collection('/userResumeSections').doc(section_id).collection('/userResumeSectionFields').doc();
      writeBatch.set(documentRef, newUserResumeSectionFields);
      logger.log('createResumeSections result =');
      await writeBatch.commit().then(() => {
        console.log('Successfully executed batch.');
        resolve({thrown:true, status:200, output: 'Successfully executed batch of user section fields.'}); 
        return;
      }).catch(err => 
        resolve({thrown:true, status:401, output: err.message})
      );
    });
  }

/**
 * Create a new user resume
 * @param userResume object
 * @return empty object of userResume with only Resume id
*/  
 @PUT
 @Path('/:resume_id') 
  async updateResume(userResume:UserResume, @PathParam('resume_id')resume_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const collections = await db.collection('userResume').doc(resume_id).collection('userResumeSections').get();
      const userResumeSections:Array<UserResumeSection> = userResume.userResumeSections!
      //logger.log("userResumeSections Array ####", userResumeSections);
      try {
        for (const doc of (await collections).docs) {
          if (doc !== null) {
            logger.log("updateSection?.sectionID before ####",  doc.id);
            const updateSection:UserResumeSection | undefined = userResumeSections.find(i => i.sectionID === doc.id);
            logger.log("updateSection?.sectionID after find ####", updateSection?.sectionID);
            //logger.log("updateSection ####", updateSection);
            const collectionRef =  await db.collection('userResume').doc(resume_id).collection('userResumeSections').doc(updateSection?.sectionID);
            const resumeID = updateSection!.resumeID;
            if (typeof resumeID === "string") {
              const fieldReference = await admin.firestore().collection("userResume").doc(resumeID);
              updateSection!.resumeID = fieldReference;              
            }
            const sectionID = updateSection!.sectionID;
            if (typeof sectionID === "string") {
              const fieldReference = await admin.firestore().collection("templateSections").doc(sectionID);
              updateSection!.sectionID = fieldReference;
            }
            const childCollections = await db.collection('userResume').doc(resume_id).collection('userResumeSections').doc(updateSection?.sectionID).collection('userResumeSectionFields').get();
            const userSectionFields:Array<UserSectionFields> = updateSection?.sectionFields!;
            for (const doc1 of (await childCollections).docs) {
              logger.log("updateSection?.sectionID before ####",  doc1.id);
              const updateSectionField:UserSectionFields | undefined = userSectionFields.find(i => i.sectionFieldID === doc1.id);
              const childCollectionRef =  db.collection('userResume').doc(resume_id).collection('userResumeSections').doc(doc.id).collection('userResumeSectionFields').doc(updateSectionField?.sectionFieldID);         
              const resumeSectionID = updateSectionField!.resumeSectionID;
              if (typeof resumeSectionID === "string") { 
                const fieldReference = await admin.firestore().collection("userResumeSections").doc(resumeSectionID);
                updateSectionField!.resumeSectionID = fieldReference;
              }
              const fieldID = updateSectionField!.fieldID;
              if (typeof fieldID === "string") {
                const fieldReference = await admin.firestore().collection("fieldID").doc(fieldID);
                updateSectionField!.fieldID = fieldReference;
              }              
              logger.log("updateSectionField", updateSectionField);
              writeBatch.update(childCollectionRef, updateSectionField!);
            }
            writeBatch.update(collectionRef, updateSection!);
          }
        }
        await writeBatch.commit().then(() => {
          logger.log('Successfully updated userResumeSections batch.');
          resolve({thrown:true, status:200, output: 'Successfully executed batch of user Resume Sections.'}); 
          return;
        }).catch(err => 
          resolve({thrown:true, status:401, output: err.message})
        );
      } catch (error) {
        logger.log('error', error);
        resolve({thrown:true, status:401, output: error.message})
      }
    });
  }

/**
 * Get ALl user resumes
 * @return UserResumes object
*/
 @GET  
 @Path('/:user_id') 
  async getUserResumes(@PathParam('user_id')user_id:string):Promise<any> {
    const userid = user_id;
    const _userResumes:any=[];
    let _userResume:UserResume ={};
    return new Promise(async (resolve, reject) => {
      const reference = admin.firestore().collection('users').doc(userid);
      await admin.firestore().collection('userResume')
      .orderBy("createdDateTime")
      .where("userID", "==", reference)
      .get()
      .then((snapshot:any) => {
        if (snapshot !== null) {
          snapshot.forEach((doc:any) => {
            logger.log('getUserResumes doc object:', doc);
              if (_userResume) {
                _userResume = doc.data();
                _userResume.resumeID = doc.id;
              }
              _userResumes.push(_userResume);
          });
          resolve({thrown:true, status:200, output: _userResumes});
          return;
        } else {
          resolve({thrown:true, status:401,  message: "no resume for this "+ user_id +" user exist"});
          return;
        }
      })
      .catch ((error:any) => {
        logger.log('getUserResumes error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  /**
   * Get a resume
   * 
   * @return UserResumes object
  */
  @GET
  @Path('/:resume_id')
  async getUserResume(@PathParam('resume_id')resume_id:string):Promise<any> {
    const resumeId = resume_id;
    let _userResume:UserResume ={};
    let _userResumeSections:any=[];
    return new Promise(async (resolve, reject) => {
      await admin.firestore().collection('userResume').doc(resumeId).get()
      .then(async (doc:any)=>{
        if (doc !== null) {
          const resumeid = doc.id;
          const result = await this._getUserResumeSections(resumeid);
          _userResumeSections = result.output;
          if (_userResume) {
            _userResume = doc.data();
            _userResume.resumeID = doc.id;
            _userResume.userResumeSections = _userResumeSections;
            if ( _userResume.userResumeSections !== null && _userResumeSections.length > 0) {
              //looping
              for (const _userResumeSection of _userResumeSections) {
                const sectionid = _userResumeSection.sectionID;
                const resultFields = await this._getUserResumeSectionFields(resumeId, sectionid);
                const _userResumeSectionFields: Array<UserSectionFields> = resultFields.output;
                logger.log('_userResumeSectionFields object:', _userResumeSectionFields.length);
                _userResumeSection.sectionFields = _userResumeSectionFields;
              }
            }
            logger.log('_userResumeSections object:', _userResumeSections.length);
          }
          resolve({thrown:true, status:200, output: _userResume});
          return;
        } else {
          resolve({thrown:true, status:401,  message: "no user resume "+ resumeId +" exist"});
          return;
        }
      })
      .catch ((error:any) => {
        logger.log('getUserResume error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  /**
   * Get a all sections only of a resume
   * @param resume_id
   * @return a array of UserResumeSection object
  */
  @GET
  @Path('/:resume_id/sections')  
  async getUserResumeSections(@PathParam('resume_id')resume_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await this._getUserResumeSections(resume_id);
      resolve(response);
    });
  }

  /**
   * Get a all sections only of a resume
   * @param section_id
   * @return a array of UserResumeSectionFields object
  */
  @GET
  @Path('/:resume_id/sections/:section_id/fields')    
  async getUserResumeSectionFields(@PathParam('resume_id')resume_id:string,@PathParam('section_id')section_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await this._getUserResumeSectionFields(resume_id,section_id);
      resolve(response);
    });
  }

  /**
   * Get a all templates of a user which is purchased
   * @param user_id
   * @return a array of UserTemplate object
  */
  @GET
  @Path('/templates/:user_id')
  async getUserTemplates(@PathParam('user_id')user_id:string):Promise<any> {
    const userid = user_id;
    const _userTemplates:any=[];
    let _userTemplate:UserTemplate={};
    return new Promise(async (resolve, reject) => {
      const reference = admin.firestore().collection("users").doc(userid);
      await admin.firestore().collection('userTemplates')
        .where("userID", "==", reference)
        .get()
        .then(async(snapshot:any) => {
          if (snapshot !== null) {
            snapshot.forEach((doc:any) => {
              logger.log('getUserTemplates doc object:', doc);
              if (doc !== null) {
                if (_userTemplate) {
                  _userTemplate = doc.data();
                  _userTemplate = doc.id;
                }
                _userTemplates.push(_userTemplate);
              } else {
                resolve({thrown:true, status:401,  message: "no template value " + userid});
                return;
              }
            });
            resolve({thrown:true, status:200, output: _userTemplates});
            return;
          } else {
            resolve({thrown:true, status:401,  message: "no template exist for this user " + userid});
            return;
          }
      })
      .catch ((error:any) => {
        logger.log('getUserTemplates error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  private _getUserResumeSections(id:string):Promise<any> {
    const resumeId = id;
    const _userResumeSections:any=[];
    let _userResumeSection:UserResumeSection = {};
    return new Promise(async (resolve, reject) => {
      const collections = admin.firestore().collection('userResume').doc(resumeId).collection('userResumeSections').orderBy('sectionIndex').get();
      try {
        (await collections).forEach(async (doc:any) => {
          if (doc !== null) {
              //logger.log('getUserResumeSections doc object:', doc);
              _userResumeSection = doc.data();
              _userResumeSection.resumeSectionID = doc.id;
              _userResumeSections.push(_userResumeSection);
          } else {
            resolve({thrown:true, status:401,  message: "no user resume sections for this resume "+ id +" exist"});
            return;
          }
        });
        resolve({thrown:true, status:200, output: _userResumeSections});
        return;
      } catch (error) {
        logger.log('getUserResumeSections error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      };
    });
  }

  private _getUserResumeSectionFields(resumeid:string, sectionid:string):Promise<any> {
    const _userResumeSectionFields:any=[];
    let _userResumeSectionField:UserSectionFields={};
    return new Promise(async (resolve, reject) => {
      try {
        const collections = admin.firestore().collection('userResume').doc(resumeid).collection('userResumeSections').doc(sectionid).collection('userResumeSectionFields').get();
        (await collections).forEach(async (doc:any) => {
          if (doc !== null) {
            if (_userResumeSectionField) {
              _userResumeSectionField = doc.data();
              _userResumeSectionField.sectionFieldID = doc.id;
            }
            _userResumeSectionFields.push(_userResumeSectionField);
          } else {
            resolve({thrown:true, status:401,  message: "no resume section fields "+ sectionid +"of " + resumeid +" exist"});
            return;
          }
        });
        resolve({thrown:true, status:200, output: _userResumeSectionFields});
        return;
      } catch (error) {
        logger.log('_getUserResumeSectionFields error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      }; 
    });
  }

  /**
  * Create a new user resume
  * @param UserResumeRequest object
  * @return userResume Object
  */ 
  private _getResumeHTML(uploadPath:string, fileName:string, resume_id:string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      let userResume:UserResume | undefined = {};
      const result = await this.getUserResume(resume_id);
      userResume = result.output;    
      logger.log('template id =', `${userResume?.templateID}`);
      //write logic for generating HTML 
      const localTemplate = path.join(process.cwd(), 'localTemplate.html');
      console.log("template downloaded locally");
      const source = fs.readFileSync(localTemplate, 'utf8');
      const html = Handlebars.compile(source)(userResume);
      const htmlUploadPath = `${uploadPath}/html/${resume_id}`;
      FileUtils.fileUpload(htmlUploadPath, html).then((pdfPath)=>{
        resolve({thrown:true, status:200, output:pdfPath}); 
      }).catch((err) => {
        logger.log('fileUpload error =', err);
        resolve({thrown:true, status:401,  message: err.message + "Issue while getting PDF"});
      });
    });
  }

  /**
   * Delete an existing userresume
   * @param Userresume id as string
   * @return message or error
  */
 @DELETE
 @Path('/:resume_id')  
  async deleteUserResume(@PathParam('resume_id')resume_id: string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const batchSize:number = 50
        const collectionRef1 = db.collection('/userResume').doc(resume_id).collection('/userResumeSections');
        
        const snapshot = collectionRef1.get();
        for (const doc of (await snapshot).docs) {
          const collectionRef = db.collection('/userResume').doc(resume_id).collection('/userResumeSections').doc(doc.id).collection('/userResumeSectionFields')
          const query = collectionRef.limit(batchSize);
          await Utils.deleteQueryBatch(query);
        }
        const query1 = collectionRef1.limit(batchSize);
        await Utils.deleteQueryBatch(query1);
        const res = db.collection('/userResume').doc(resume_id).delete();
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