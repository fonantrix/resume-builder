import { admin } from './../configurations/admin';
import * as functions from 'firebase-functions';
import { UserSectionFields } from '../models/userSectionFields';
import { firebase } from '../configurations/firebase';

const db = firebase.firestore();
const logger = functions.logger;

export default class Utils {

    static async copyCollection(srcCollectionName:string, destCollectionName:string) {
        return new Promise(async (resolve, reject) => {
            const documents = await admin.firestore().collection(srcCollectionName).get();
            let writeBatch = admin.firestore().batch();
            const destCollection = admin.firestore().collection(destCollectionName);
            let i = 0;
            for (const doc of documents.docs) {
                writeBatch.set(destCollection.doc(), doc.data());
                i++;
                if (i > 400) {  // write batch only allows maximum 500 writes per batch
                    i = 0;
                    logger.log('Intermediate committing of batch operation');
                    await writeBatch.commit();
                    writeBatch = admin.firestore().batch();
                }
            }
            if (i > 0) {
                logger.log('Firebase batch operation completed. Doing final committing of batch operation.');
                await writeBatch.commit();
            } else {
                logger.log('Firebase batch operation completed.');
            }
            resolve();
        });
    }

    static async copySpecificTemplateSectionToUserResumeSections(srcCollectionName:string, srcCollectionid:string, destParentCollectionName:string, destParentDocId:string, destCollectionName:string) {
        return new Promise(async (resolve, reject) => {
            try {
                const reference = await admin.firestore().collection("template").doc(srcCollectionid);
                const documents = await admin.firestore().collection(srcCollectionName)
                .where("templateID", "==", reference)
                .get();
                let writeBatch = admin.firestore().batch();
                const destCollection = admin.firestore().collection(destParentCollectionName).doc(destParentDocId).collection(destCollectionName);
                let i = 0;
                for (const doc of documents.docs) {
                    const newCollection = destCollection.doc() as any;
                    newCollection.resumeID =  db.doc("/userResume/" + destParentDocId);
                    writeBatch.set(newCollection, doc.data());
                    const subDocuments = await admin.firestore().collection(srcCollectionName).doc(doc.id).collection("templateSectionFields").get();
                    for (const doc1 of subDocuments.docs) {
                        const newSubCollection = newCollection.collection("userResumeSectionFields").doc();
                        logger.log("newSubCollection doc1:",doc1);
                        const sectionFields:any =  doc1.data();
                        const fieldID = sectionFields.fieldID._path.segments[1];
                        logger.log("userSectionFields.fieldID:",fieldID);
                        const fieldReference = await admin.firestore().collection("field").doc(fieldID);
                        const userSectionFields:UserSectionFields = {};
                        userSectionFields.fieldID = fieldReference;
                        writeBatch.set(newSubCollection, userSectionFields);
                        i++;
                    }
                    i++;
                    if (i > 400) {  // write batch only allows maximum 500 writes per batch
                        i = 0;
                        logger.log('Intermediate committing of batch operation');
                        await writeBatch.commit();
                        writeBatch = admin.firestore().batch();
                    }
                }
                if (i > 0) {
                    logger.log('Firebase batch operation completed. Doing final committing of batch operation.');
                    await writeBatch.commit();
                    resolve();
                    return;
                } else {
                    logger.log('Firebase batch operation completed.');
                    reject();
                    return;
                }
            } catch (error){
                logger.log('deleteQueryBatch error =', error);
                reject();
                return;
            }
        });
    }
    
    static async deleteQueryBatch(query:any) {
        return new Promise(async (resolve, reject) => {    
            try {
                const snapshot = await query.get();
                const batchSize = snapshot.size;
                if (batchSize === 0) {
                    // When there are no documents left, we are done
                    resolve();
                    return;
                }
                // Delete documents in a batch
                const batch  = admin.firestore().batch();
                snapshot.docs.forEach((doc:any) => {
                    batch.delete(doc.ref);
                });
                await batch.commit();
            
                // Recurse on the next process tick, to avoid
                // exploding the stack.
                /*process.nextTick(() => {
                    this.deleteQueryBatch(query);
                });*/
            } catch(error) {
                logger.log('deleteQueryBatch error =', error);
                reject({thrown:true, status:401, output: error.message})
                return;
            }

        });
    }   
}