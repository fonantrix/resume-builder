import * as express from 'express';
import * as bodyParser from "body-parser";
import cors = require('cors');
const compression = require('compression');
const path = require('path');
import {Server} from "typescript-rest";
// @ts-ignore

class ResumeBuilder {
    public app: express.Application;
    public main: express.Application;
    constructor(controllers:any) {
        this.app = express();
        this.main = express();
        this.config();
        this.initializeControllers(controllers);
    }
    private config(): void {
        this.main.use(cors());
        this.app.use(compression());
        this.main.use(compression());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.main.use(express.static(path.join(__dirname, 'public')));
        Server.buildServices(this.main);
        Server.swagger(this.main, {endpoint:'swagger', filePath:'./dist/swagger.json', host:'localhost:5001', schemes: ['http']})
        this.main.use('/api/', this.app);
        this.main.use(bodyParser.json());
        this.main.use(bodyParser.urlencoded({ extended: false }));
        this.main.use(function(req, res, next) {
          console.log('Time:', Date.now())
            if (req.method === 'OPTIONS') {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Methods", "*");
              res.header("Access-Control-Allow-Credentials", "true");
              res.header("Access-Control-Max-Age", "3600");
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.status(204).send('');
              next();
            }
        });
    }
    private initializeControllers(controllers:any) { 
      controllers.forEach((controller:any) => {
        this.app.use('/', controller.router);
      });
      this.app.use('*', function(req, res,next){
        res.status(404).send('');
      });
    }
}
export default ResumeBuilder;