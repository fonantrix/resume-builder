import * as express from 'express';

export interface IResponseHandler{
    sendMessageResponse(statusCode:number, data:any, res:express.Response):any;
    sendResponse(statusCode:number, uid:string, data:any, res:express.Response):any;
    sendError(statusCode:number, res:express.Response, message?:any, error?:any):any;
}
 