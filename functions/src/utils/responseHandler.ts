import {IResponseHandler} from './types/responseHandler';
import * as express from 'express';

export class ResponseHandler implements IResponseHandler{

    sendResponse(statusCode:number, uid:string, data:any, res:express.Response):any {
        return res.status(statusCode).json({uid,data})
    }
    
    sendMessageResponse(statusCode:number, data:any, res:express.Response):any {
        return res.status(statusCode).json({data})
    }

    sendError(statusCode:number, res:express.Response, message?:any, error?:any):any {
        if (error) {
            return res.status(statusCode).json({error})
        } else if (message) {
            return res.status(statusCode).json({message})
        }
    }
   
}