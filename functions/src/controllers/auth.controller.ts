import * as express from 'express';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import * as functions from 'firebase-functions';
import {ResponseHandler} from './../utils/responseHandler';
import {IResponseHandler} from './../utils/types/responseHandler';

const logger = functions.logger;

class AuthController {

  //creating service
  authService = new AuthService();
  userService = new UserService();
  controllerResponse:IResponseHandler;

  //API Route for this controllewr
  public path = '/auth';
  public router = express.Router();

  //controller constructor
  constructor() {
    this.intializeRoutes();
    this.controllerResponse = new ResponseHandler();
  } 

  //intializing Post/Get/Delete request with mappings
  public intializeRoutes() {
    this.router.post(this.path+"/", this.loginUser);
    this.router.post(this.path+"/logout", this.logoutUser);
  } 

  loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await this.authService.getAuthorizedUser(email, password);
        if (result.status === 200) {
          const resultedUser = await this.userService.getUserByEmail(email);
          this.controllerResponse.sendResponse(result.status,result.output.userID,resultedUser.output,res);
         } else {
          this.controllerResponse.sendError(result.status, res, result.message);
         }
    } catch (error) {
      logger.log(error);
      logger.log('getAuthorizedUser error =', error);
      this.controllerResponse.sendError(500, res, null, error.message);
    }
  }

  logoutUser = async (req:express.Request,res:express.Response)=>{
    try{
      logger.log('logoutUser user');
      await this.authService.logoutUser();
    }
    catch(err){
      logger.log('logoutUser error =', err.message);
      this.controllerResponse.sendError(500, res, null, err.message);
    }
  }
}
 
export default AuthController;