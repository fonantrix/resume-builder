import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { auth } from "./../config/cert";
import { config } from "./../config/config";
// @ts-ignore
const {Storage} = require('@google-cloud/storage')

admin.initializeApp(
  {
  	credential: admin.credential.cert(auth()),
    databaseURL: functions.config().database_url,
    storageBucket: functions.config().storage_bucket
  }
);


const storage = new Storage()
const bucketStorage = storage.bucket(config().storageBucket)

const firebaseStorage = admin.storage();
const bucket = firebaseStorage.bucket(config().storageBucket);
export {admin,bucket,bucketStorage};