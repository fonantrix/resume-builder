import * as functions from 'firebase-functions';
import { bucket } from '../configurations/admin';
import { firebase } from '../configurations/firebase';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/storage';
// @ts-ignore
const path = require('path');
const logger = functions.logger;
const storage = firebase.storage();

export default class FileUtils {

    static async fileUpload(folder:string, localPDFFile:string):Promise<any> {
        return new Promise((resolve, reject) => {
            // Create a new file in the bucket.
            bucket.upload(localPDFFile, { destination: folder + 'output.pdf', metadata: { contentType: 'application/pdf'}}).then((snapshot:any) => {
                logger.log("PDF created and uploaded!");
                resolve(snapshot[1].name);
              }).catch((error:any) => {
                logger.error(error);
                reject(error);
              });
        });
    }
    
    static async verifyFileExist(folder:string, type:string, fileName:string, resume_id:string):Promise<any> {
        return new Promise(async (resolve, reject) => {
            let fileFolder = "";
            if (type === 'html') {
                fileFolder = `${folder}/html/${resume_id}`;
            } else {
                fileFolder = `${folder}/pdf/${resume_id}`;
            }
            logger.log("########", `${fileFolder}/${fileName}`);
            const file = bucket.file(`${fileFolder}/${fileName}`);
            await file.exists()
                .then((data:any) => {
                    logger.log('inside exists');
                    resolve(data[0]);
                })
                .catch(() => {
                    logger.log('inside reject');
                    resolve(false);
                });
        });
    }

    static async getFileURL(folder:string, type:string, fileName:string, resume_id:string):Promise<any> {
        return new Promise(async (resolve, reject) => {
            let fileFolder = "";
            if (type === 'html') {
                fileFolder = `${folder}/html/${resume_id}`;
            } else {
                fileFolder = `${folder}/pdf/${resume_id}`;
            }
            await storage.ref(fileFolder).child(fileName).getDownloadURL()
            .then((Url: any) => {
                logger.log('getDownloadURL:');
                resolve(decodeURI(Url));
              })
              .catch((err) => {
                logger.log('getDownloadURL reject');
                reject(err);
              });
        });
    }
    
    static async downloadFolder(files:any, htmlFilePath:string):Promise<any> {
        return new Promise(async (resolve, reject) => {
            let localTemplate:any = null;
            let counter = 0;
            const filesLength = files.length;
            try {
                // files is an array of File objects.
                files.forEach(async (file:any) => {
                    console.log("#########file", file.name);
                    const outputFileName = (file.name).replace(htmlFilePath,"");
                    localTemplate = path.join(process.cwd(),"temp", outputFileName);

                    bucket.file(file.name).download({ destination: localTemplate}).then(() => {
                        counter++;
                        if (filesLength === counter) {
                            resolve();
                        }
                    }).catch((error) => {
                        // Handle any errors
                        logger.log('download error =', error);
                        counter++;
                    });
                });
            } catch(error) {
                // Handle any errors
                logger.log('download error =', error);
                reject(error);
            }
        });
    }
}