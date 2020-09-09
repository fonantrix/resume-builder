import { firebase } from './../configurations/firebase';
import { UserRef } from "./../models/userRef";
import * as _ from "lodash";
import * as functions from 'firebase-functions';

import { AddressFormat } from '../models/addressFormat';
import { AddressFormatFields } from '../models/addressFormatFields';
import {Path, POST} from 'typescript-rest';

const db = firebase.firestore();
const logger = functions.logger;

@Path('/auth')
export class AuthService { 

  @POST
  @Path('/logout')
  async logoutUser() {
    await firebase.auth().signOut().then(function() {
        logger.log('Signed Out');
      })
      .catch ((error:any) => {
        logger.log('logoutUser error =', error);
      });      
  }
  

  async getAddressFormat(id:string): Promise<any> {
    let addressFormatField:AddressFormatFields = {}
    const addressFormatFields:any = []
    return new Promise(async (resolve, reject) => {
      await db.collection('addressFormat').doc(id).get()
      .then(async (doc:any) => {
        if (doc !== null) {
          let addressFormat:AddressFormat;
          addressFormat = doc.data();
          addressFormat.formatID = doc.id;
          logger.log("getAddressFormat:", addressFormat);
          const collection = await db.collection('addressFormat').doc(id).collection("addressFormatFields").get()
          try {
            if (collection !== null) {
              for (const doc1 of collection.docs) {
                  addressFormatField = doc1.data();
                  addressFormatField.AddressFormatFieldID = doc1.id;
                  //removing key from this object
                  delete addressFormatField.addressFormatID;
                  addressFormatFields.push(addressFormatField);
              }
            }
            addressFormat.addressFormatFields = addressFormatFields;
          } catch (error) {
            resolve({thrown:true, status:error.code ,  message: error.message});
            return;
          };
          resolve({thrown:true, status:200, output:addressFormat});
          return;
        } else {
          resolve({thrown:true, status:401,  message: "incorrect address format id" + doc.id});
          return;
        }
      })
      .catch ((error:any) => {
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  @POST
  //@Path('/login')
  getAuthorizedUser = (email:string, password:string):Promise<any> => {
    return new Promise(async (resolve, reject) => {
      await firebase.auth().signInWithEmailAndPassword(
          email,
          password
      ).then(async (userRecord:any)=> {
          if (userRecord !== null) {
            let authUser:UserRef;
            authUser = userRecord.user.providerData[0];
            authUser.userID = userRecord.user.uid;
            resolve({thrown:true, status:200, output:authUser});
            return;
          } else {
            logger.log('User not available!');
            resolve({thrown:true, status:401,  message: "no username "+email+" currently exist"});
            return;
          }
      })
      .catch ((error:any) => {
        logger.log('getAuthorizedUser error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

}