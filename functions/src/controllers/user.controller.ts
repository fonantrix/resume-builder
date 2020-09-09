import * as express from 'express';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { UserRef } from "./../models/userRef";
import { User } from "./../models/user";
import * as functions from 'firebase-functions';
import {ResponseHandler} from './../utils/responseHandler';
import {IResponseHandler} from './../utils/types/responseHandler';

const logger = functions.logger;


class UsersController {

  //creating service
  userService = new UserService();
  authService = new AuthService();
  controllerResponse:IResponseHandler;

  //API Route for this controllewr
  public path = '/users';
  public router = express.Router();

  //controller constructor
  constructor() {
    this.intializeRoutes();
    this.controllerResponse = new ResponseHandler();
  } 

  public intializeRoutes() {
    this.router.post(this.path+"/", this.createNewUser);
    this.router.put(this.path+"/:user_id", this.updateUser);
    this.router.put(this.path+"/user/:user_id", this.updateUserSingleField);
    this.router.delete(this.path+"/:user_id", this.deleteUser);
    this.router.get(this.path+"/get/:user_id", this.getUserById);
    this.router.get(this.path+"/", this.getAllUser);
    this.router.get(this.path+"/addressFormat", this.getAddressFormat);
  } 
  
  createNewUser = async (req: express.Request, res: express.Response) => {
    try {
      logger.log('createNewUser call with request =', req);
      const user = req.body.userRef as UserRef; 
      const result = await this.userService.createNewUser(user);
      if (result.status === 200) {
        this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
       } else {
        this.controllerResponse.sendError(result.status, res, result.message);
       }
    } catch (error) {
      console.error(error);
      logger.log('createNewUser error =', error);
      this.controllerResponse.sendError(500, res, null, error.message);
    }
  }

  
  updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const user:User = req.body as User; 
      user.userID = req.params.user_id;
      logger.log('user.userID =', user.userID);
      const result = await this.userService.updateUser(user);
      logger.log('updateUserlog result =', result);
      if (result.status === 200) {
        this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
       } else {
        this.controllerResponse.sendError(result.status, res, result.message);
       }
    } catch (error) {
      logger.log('updateUserlog error =', error);
      this.controllerResponse.sendError(500, res, error.message);
    }
  }

  
  updateUserSingleField = async (req: express.Request, res: express.Response) => {
    try {
      const obj = {
        fieldKey:req.body.key,
        fieldValue:req.body.value,
      }
      const userID:string = req.params.user_id;

      const result = await this.userService.updateUserSpecificField(userID, obj);
      logger.log('updateUserSingleField result =', result);
      if (result.status === 200) {
        this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
       } else {
        this.controllerResponse.sendError(result.status, res, result.message);
       }
    } catch (error) {
      logger.log('updateUserSingleField error =', error);
      this.controllerResponse.sendError(500, res, error.message);
    }
  }  

  
  deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.user_id;
        await this.userService.deleteUser(id);
    } catch (error) {
      console.error("User delete Error:",error);
      logger.log('deleteUser error =', error);
      this.controllerResponse.sendError(500, res, error.message);
    }
  }

  
  getAllUser = async (req: express.Request, res: express.Response) => {
    try {
      const result = await this.userService.getAllUser();
      if (result.status === 200 ) {
        this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
      } else {
        this.controllerResponse.sendError(result.status, res, result.message);
      }
    } catch (error) {
      console.error(error);
      this.controllerResponse.sendError(500, res, error.message);
    }     
  }

  getUserById = async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.user_id;
      const result = await this.userService.getUserById(id);
      console.log('getAddressFormat result =', result.output);
      if (result.status === 200) {
        this.controllerResponse.sendResponse(result.status,result.output.userID,result.output,res);
       } else {
        this.controllerResponse.sendError(result.status, res, result.message);
       }
    } catch (error) {
      console.error("user get Error:",error);
      logger.log('getUserById error =', error);
      this.controllerResponse.sendError(500, res, error.message);
    }
  }

  getAddressFormat = async (req: express.Request, res: express.Response) => {
    try {
      //European Addresses
      const id = 'EYkyzyMHw2qEKa4E9txN';
      const result = await this.authService.getAddressFormat(id);
      if (result.status === 200) {
        this.controllerResponse.sendResponse(result.status,result.output.formatID,result.output,res);
       } else {
        this.controllerResponse.sendError(result.status, res, result.message);
       }
    } catch (error) {
      logger.log('getAddressFormat error =', error);
      this.controllerResponse.sendError(500, res, error.message);
    }
  }
}
 
export default UsersController;