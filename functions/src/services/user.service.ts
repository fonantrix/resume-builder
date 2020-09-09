import { firebase } from './../configurations/firebase';
import { admin, bucket } from './../configurations/admin';
import * as _ from "lodash";
import * as functions from 'firebase-functions';
import {UserRef} from "./../models/userRef";
import {User} from "./../models/user";
import {Path, GET, POST, PathParam, PUT, DELETE} from 'typescript-rest';
import { AddressField } from './../models/addressField';

const logger = functions.logger;
const db = firebase.firestore();

@Path('/users')
export class UserService { 

  /**
   * Get user by userid
   * @param user_id identity
   * @return User object
  */
  @GET
  @Path('/user/:user_id')
  async getUserById(@PathParam('user_id')user_id: string): Promise<any> {
    logger.log('getUserById call', user_id);
    let _userAddressField:AddressField = {};
    const _userAddressFields:any=[];
    const _userAddress:any=[];
    return new Promise(async (resolve, reject) => {
      const groupsdata= db.collection('users').doc(user_id);
      await groupsdata.get()
      .then(async (snapshot:any) => {
        if (snapshot === null) {
          logger.log('incorrect user id', user_id);
          resolve({thrown:true, status:401,  message: "incorrect user id"});
          return;
        } else {
          const query = admin.firestore().collection('users').doc(user_id).collection("address").get();
          await query.then(async(snapshotAdd:any) => {          
            if (snapshotAdd !== null) {
              snapshotAdd.forEach((doc:any) => {
                if (doc !== null) {
                  _userAddressField = doc.data();
                  //_userAddressField.addressFieldID = doc.id;
                  _userAddressFields.push(_userAddressField);
                } else {
                  resolve({thrown:true, status:401,  message: "no address for this user "+ user_id +" exist"});
                  return;
                }
              });
            }
          }).catch ((error:any) => {
            logger.log('getUserById error =', error);
            resolve({thrown:true, status:error.code,  message: error.message});
            return;
          });
         let newUser:User;
         newUser = snapshot.data();
         newUser.userID = snapshot.id;
         const photo = newUser.photoURL!;
         const file = bucket.file(photo);
         file.getSignedUrl({action: 'read',expires: '03-17-2025'}).then((result:any) => {
           newUser.photoURL = result[0];
           _userAddress.push(_userAddressFields);
           newUser.addresses = _userAddress;
           resolve({thrown:true, status:200, output:newUser});
           return;
         }).catch ((error:any) => {
          resolve({thrown:true, status:error.code ,  message: error.message});
          return;
          });
       }
     })
     .catch ((error:any) => {
       logger.log('getUserById error =', error);
       resolve({thrown:true, status:error.code ,  message: error.message});
       return;
     });
   });
 }

  /**
   * Get user by email
   * @param email identity
   * @return User object
  */
  @GET
  @Path('/:email')
  async getUserByEmail(@PathParam('email') email: string): Promise<any> {
    logger.log('getUserByEmail call', email);
    return new Promise(async (resolve, reject) => {
      await admin.firestore().collection('users')
      .where("email", "==", email)
      .get()
      .then((snapshot:any) => {
        logger.log('###Snapshot###', snapshot);
        if (snapshot === null) {
          logger.log('incorrect user email', email);
          resolve({thrown:true, status:401,  message: "incorrect user email"});
          return;
        } else {
          snapshot.forEach((doc:any) => {
            if (doc !== null) {
              let newUser:User;
              newUser = doc.data();
              newUser.userID = doc.id;
              const photo = newUser.photoURL!;
              const file = bucket.file(photo);
              file.getSignedUrl({action: 'read',expires: '03-17-2025'}).then((result:any) => {
                newUser.photoURL = result[0];
                logger.log('user id exists', newUser.userID);
                resolve({thrown:true, status:200, output:newUser});
                return;
              }).catch ((error:any) => {
                resolve({thrown:true, status:error.code ,  message: error.message});
                return;
              });            
            } else {
              resolve({thrown:true, status:401,  message: "Data not found"});
              return;
            }

          });
        }
      })
      .catch ((error:any) => {
        logger.log('getUserByEmail error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  /**
   * Create a new user
   * @param UserRef object
   * @return new created User id
  */
  @POST
  @Path('/')
  // body: a json representation of the UserRef object
  async createNewUser(userRef:UserRef):Promise<any> {
    const newUser = userRef;
    return new Promise(async (resolve, reject) => {
      await firebase.auth().createUserWithEmailAndPassword(
        newUser.emailAddress!,
        newUser.password!
      ).then(async (userRecord:any)=> {
        await firebase.firestore().doc('/users/'+userRecord.user.uid).set(newUser).then(async (doc:any)=>{
          if (doc === null) {
            resolve({thrown:true, status:401,  message: "Unable to create user with id "+ newUser.emailAddress +", user might already exist"});
            return;
          } else {
            newUser.userID = userRecord.user.uid;
            logger.log('createNewUser result =', newUser);
            resolve({thrown:true, status:200, output: newUser}); 
            return;
          }
        });
      })
      .catch ((error:any) => {
        logger.log('createNewUser error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }

  /**
   * update an existing user
   * @param User object
   * @return empty object of user with only User id
  */
  @PUT
  @Path('/:user_id')
  // body: a json representation of the User object
  async updateUser(user:any):Promise<any> {
    const requestUser = user;
    return new Promise(async (resolve, reject) => {
        await db.doc('/users/'+requestUser.userID).update(requestUser).then((doc:any)=>{
            if (doc === null) {
                console.log('User not available!');
                resolve({thrown:true, status:401,  message: "no user "+requestUser.userID+" exist"});
                return;
            } else {
                const newUser:User = {};
                newUser.userID = newUser.userID;
                logger.log('updateUser result =', newUser);
                resolve({thrown:true, status:200, output: newUser}); 
                return;
            }
        })
        .catch ((error:any) => {
          logger.log('updateUser error =', error);
          resolve({thrown:true, status:error.code ,  message: error.message});
          return;
        });       
    });
  }

  /**
   * update specific field of an existing user
   * @param User object
   * @return empty object of user with only User id
  */
  @PUT
  @Path('/user/:user_id')
  async updateUserSpecificField(@PathParam('user_id')user_id:string, obj:any):Promise<any> {
    const id = user_id;
    const fieldKey:string = obj.fieldKey; 
    const fieldValue:string = obj.fieldValue; 
    return new Promise(async (resolve, reject) => {
        const updateValue:any = {};
        updateValue[`${fieldKey}`] = fieldValue;
        logger.log("updateValue", updateValue);
        await db.doc('/users/'+id).update(updateValue).then((doc:any)=>{
            if (doc === null) {
                logger.log('User not available!');
                resolve({thrown:true, status:401,  message: "no user "+id+" exist"});
                return;
            } else {
                const newUser:User = {};
                newUser.userID = id;
                logger.log('updateUserSpecificField result =', newUser);
                resolve({thrown:true, status:200, output: newUser}); 
                return;
            }
        })
        .catch ((error:any) => {
          logger.log('updateUserProfilePic error =', error);
          resolve({thrown:true, status:error.code ,  message: error.message});
          return;
        });       
    });
  }  

  /**
   * Delete an existing user
   * @param User id as string
   * @return none
  */
  @DELETE
  @Path('/:id')
  async deleteUser(@PathParam('id')id: string):Promise<any> {
    await admin.auth().deleteUser(id)
      .then(() => {
          console.log('User Authentication record deleted!');
          return;
      })
      .catch ((error:any) => {
        logger.log('deleteUser error =', error);
        //resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
  }

  /**
   * Get ALl users
   * @return Users object
  */ 
 @GET
  async getAllUser():Promise<any> {
    const _userList:any=[];
    return new Promise(async (resolve, reject) => {    
      const query = admin.firestore().collection('users').get();
      await query.then(async(snapshot:any) => {
        logger.log('getAllUser call:', snapshot);
        if (snapshot !== null) {
          snapshot.forEach((doc:any) => {
            logger.log('doc object:', doc);
              const obj = {
                ID:doc.id,
                document:doc.data(),
              }
            _userList.push(obj);
          });
          resolve({thrown:true, status:200, output: _userList});
          return;
        } else {
          console.log('Users does not exists!');
          resolve({thrown:true, status:401,  message: "no user exist"});
          return;
        }
      })
      .catch ((error:any) => {
        logger.log('getAllUser error =', error);
        resolve({thrown:true, status:error.code ,  message: error.message});
        return;
      });
    });
  }  

}