/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const http = __webpack_require__(1);
	const debug = __webpack_require__(2);
	const app_1 = __webpack_require__(3);
	debug('ts-express:server');
	const port = normalizePort(process.env.PORT || 3000);
	app_1.default.set('port', port);
	const server = http.createServer(app_1.default);
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
	function normalizePort(val) {
	    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
	    if (isNaN(port))
	        return val;
	    else if (port >= 0)
	        return port;
	    else
	        return false;
	}
	function onError(error) {
	    if (error.syscall !== 'listen')
	        throw error;
	    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	    switch (error.code) {
	        case 'EACCES':
	            console.error(`${bind} requires elevated privileges`);
	            process.exit(1);
	            break;
	        case 'EADDRINUSE':
	            console.error(`${bind} is already in use`);
	            process.exit(1);
	            break;
	        default:
	            throw error;
	    }
	}
	function onListening() {
	    let addr = server.address();
	    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
	    debug(`Listening on ${bind}`);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(4);
	const logger = __webpack_require__(5);
	const bodyParser = __webpack_require__(6);
	const mongoose = __webpack_require__(7);
	//Controllers
	const company_controller_1 = __webpack_require__(8);
	const user_controller_1 = __webpack_require__(12);
	const swi_controller_1 = __webpack_require__(14);
	// Creates and configures an ExpressJS web server.
	class App {
	    //Run configuration methods on the Express instance.
	    constructor() {
	        this.dbConnString = "mongodb://appUser:Password2@ds141368.mlab.com:41368/sf-toolkit";
	        this.express = express();
	        this.middleware();
	        this.dbConfig();
	        this.routes();
	    }
	    // Configure Express middleware.
	    middleware() {
	        this.express.use(function (req, res, next) {
	            res.header("Access-Control-Allow-Origin", "*");
	            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	            next();
	        });
	        this.express.use(logger('dev'));
	        this.express.use(bodyParser.json());
	        this.express.use(bodyParser.urlencoded({ extended: false }));
	    }
	    dbConfig() {
	        mongoose.connect(this.dbConnString);
	    }
	    // Configure API endpoints.
	    routes() {
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
	        this.express.use('/api/v1/company', new company_controller_1.default().route());
	        this.express.use('/api/v1/users', new user_controller_1.default().route());
	        this.express.use('/api/v1/SWI', new swi_controller_1.default().route());
	    }
	}
	exports.App = App;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new App().express;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const base_controller_1 = __webpack_require__(9);
	const company_model_1 = __webpack_require__(11);
	class CompanyController extends base_controller_1.default {
	    constructor() {
	        super(company_model_1.Company, '_id');
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CompanyController;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express_1 = __webpack_require__(4);
	const utils_1 = __webpack_require__(10);
	const MAX_RESULTS = 100;
	/**
	  Generic controller that provides CRUD operations for a given Mongoose model
	*/
	class BaseController {
	    /**
	      @param model Mongoose model
	      @param key primary key of the model that will be used for searching, removing
	      and reading
	    */
	    constructor(model, key) {
	        this.model = model;
	        this.modelName = model.modelName.toLowerCase();
	        this.key = key;
	    }
	    create(data) {
	        return this.model
	            .create(data)
	            .then((modelInstance) => {
	            var response = {};
	            response = modelInstance;
	            //response[this.modelName] = modelInstance;
	            return response;
	        });
	    }
	    read(id) {
	        var filter = {};
	        filter[this.key] = id;
	        return this.model
	            .findOne(filter)
	            .then((modelInstance) => {
	            var response = {};
	            response = modelInstance;
	            //response[this.modelName] = modelInstance;
	            return response;
	        });
	    }
	    list() {
	        return this.model
	            .find({})
	            .limit(MAX_RESULTS)
	            .then((modelInstances) => {
	            var response = {};
	            response[this.modelName] = modelInstances;
	            return response;
	        });
	    }
	    delete(id) {
	        const filter = {};
	        filter[this.key] = id;
	        return this.model
	            .remove(filter)
	            .then(() => {
	            return {};
	        });
	    }
	    /**
	     */
	    update(id, data) {
	        var filter = {};
	        filter[this.key] = id;
	        return this.model
	            .findOne(filter)
	            .then((modelInstance) => {
	            for (var attribute in data) {
	                if (data.hasOwnProperty(attribute) && attribute !== this.key && attribute !== "_id") {
	                    modelInstance[attribute] = data[attribute];
	                }
	            }
	            return modelInstance.save();
	        })
	            .then((modelInstance) => {
	            var response = {};
	            response[this.modelName] = modelInstance;
	            return response;
	        });
	    }
	    route() {
	        const router = express_1.Router();
	        router.get("/", (req, res) => {
	            this
	                .list()
	                .then(utils_1.ok(res))
	                .then(null, utils_1.fail(res));
	        });
	        router.post("/", (req, res) => {
	            this
	                .create(req.body)
	                .then(utils_1.ok(res))
	                .then(null, utils_1.fail(res));
	        });
	        router.get("/:key", (req, res) => {
	            this
	                .read(req.params.key)
	                .then(utils_1.ok(res))
	                .then(null, utils_1.fail(res));
	        });
	        router.put("/:key", (req, res) => {
	            this
	                .update(req.params.key, req.body)
	                .then(utils_1.ok(res))
	                .then(null, utils_1.fail(res));
	        });
	        router.delete("/:key", (req, res) => {
	            this
	                .delete(req.params.key)
	                .then(utils_1.ok(res))
	                .then(null, utils_1.fail(res));
	        });
	        return router;
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BaseController;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/**
	  Returns a function that will write the result as a JSON to the response
	*/
	function ok(res) {
	    return (data) => {
	        res.json(data);
	    };
	}
	exports.ok = ok;
	;
	/**
	  Depending on the error type, will perform the following:

	  Object was not found - 404 Not Found
	  Invalid or missing input parameter - 400 Bad request
	  Not enough privileges - 401 Unauthorized
	  Unknown error - 500 Internal server error
	*/
	function fail(res) {
	    return (error) => {
	        console.log(error);
	        res.sendStatus(404).end();
	    };
	}
	exports.fail = fail;
	;
	function autoPopulateAllFields(schema) {
	    var paths = '';
	    schema.eachPath(function process(pathname, schemaType) {
	        if (pathname == '_id')
	            return;
	        if (schemaType.options.ref)
	            paths += ' ' + pathname;
	    });
	    schema.pre('find', handler);
	    schema.pre('findOne', handler);
	    function handler(next) {
	        this.populate(paths);
	        next();
	    }
	}
	exports.autoPopulateAllFields = autoPopulateAllFields;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mongoose = __webpack_require__(7);
	const companySchema = new mongoose.Schema({
	    name: String,
	    erpName: String,
	    description: String
	});
	const Company = mongoose.model('Company', companySchema);
	exports.Company = Company;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const base_controller_1 = __webpack_require__(9);
	const user_model_1 = __webpack_require__(13);
	class UserController extends base_controller_1.default {
	    constructor() {
	        super(user_model_1.User, '_id');
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UserController;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mongoose = __webpack_require__(7);
	const utils_1 = __webpack_require__(10);
	const userSchema = new mongoose.Schema({
	    firstName: String,
	    lastName: String,
	    userName: String,
	    defaultCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
	});
	userSchema.plugin(utils_1.autoPopulateAllFields);
	const User = mongoose.model('User', userSchema);
	exports.User = User;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const base_controller_1 = __webpack_require__(9);
	const swi_model_1 = __webpack_require__(15);
	class SWIController extends base_controller_1.default {
	    constructor() {
	        super(swi_model_1.SWI, '_id');
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SWIController;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mongoose = __webpack_require__(7);
	const utils_1 = __webpack_require__(10);
	const swiSchema = new mongoose.Schema({
	    title: { type: String, required: true },
	    revision: { type: String, required: true },
	    isReleased: { type: Boolean, required: true },
	    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	    expert: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
	    approver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
	    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
	    stages: [{
	            sequence: { type: String, required: true },
	            text: { type: String },
	            imageCaption: { type: String },
	            isCriticalStep: { type: Boolean, required: true, default: false },
	            carePoint: { type: String },
	            hyperlink: { type: String },
	            observations: [{
	                    text: { type: String },
	                    jobNumber: { type: String },
	                    observer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
	                }]
	        }]
	});
	swiSchema.plugin(utils_1.autoPopulateAllFields);
	const SWI = mongoose.model('SWI', swiSchema);
	exports.SWI = SWI;


/***/ }
/******/ ]);