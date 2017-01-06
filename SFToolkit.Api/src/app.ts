import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as debug from 'debug';
import * as cors from 'cors';

//Controllers
import CompanyController from './controllers/company.controller';
import UserController from './controllers/user.controller';
import SWIController from './controllers/swi.controller';

// Creates and configures an ExpressJS web server.
export class App {

  private dbConnString: string = "mongodb://appUser:Password2@ds141368.mlab.com:41368/sf-toolkit";

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.dbConfig();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {

    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
      next();
    });


    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private dbConfig() {
    mongoose.connect(this.dbConnString);
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/company', new CompanyController().route());
    this.express.use('/api/v1/users', new UserController().route());
    this.express.use('/api/v1/SWI', new SWIController().route());

  }
}

export default new App().express;
