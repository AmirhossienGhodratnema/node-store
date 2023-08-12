const cookieParser = require('cookie-parser');
const path = require('path')
// My require
const { errorHandler, notFoundError } = require('./errors/errorHandlers');
const { AllRoutesApi } = require('./router/api/router');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const exoressEjsLayouts = require('express-ejs-layouts')
const ejs = require('ejs');
const expressEjsLayouts = require('express-ejs-layouts');
const { AllRoutesWeb } = require('./router/web/router');
const { initialSocket } = require('./TCP/socket.io/server');
const { socketHandler } = require('./TCP/socket.io');
const session = require('express-session')

module.exports = class Application {

    #express = require('express');    // Require express private.
    #app = this.#express();    // Get app in express and private.

    constructor(PORT, DB_URL) {
        console.log('--- The server is starting up ---'.yellow.bold.italic);
        this.configDatabase(DB_URL);    // Configuration DB.
        this.innitRedis()
        this.confiApplication();    // Configuration application.
        this.initTemplateEngin()
        this.createServer(PORT);    // Create server.
        this.createRoute();    // Create routes
        this.errorHandler();    // Error handlers.

    };

    //  Server configuration
    confiApplication() {
        const path = require('path');

        // Opitons config.
        this.#app.use(cors());
        // this.#app.use(morgan('dev'));    // Loger
        this.#app.use(this.#express.static(path.join(__dirname, 'public')));    // Set static files.
        this.#app.use(this.#express.json())    // Json body-parser setting.
        this.#app.use(this.#express.urlencoded({ extended: true }));    // urlencoded body-parser setting.
        this.#app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSER));    // Set cookie-parser and secret-key. 
        this.#app.use(session({
            secret: process.env.SECRET_KEY_COOKIE_PARSER,
            resave:true,
            saveUninitialized:true,
            cookie: {
                secure: true
            }
        }));
        // View engine config. 
        // this.#app.set('view engine', 'ejs');    // Set view engine,
        // this.#app.set('views', path.join(__dirname, 'views'));    // Set dir view file.

        this.#app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Hello World',
                    version: '1.0.0',
                    description: 'Create api supported in new node store project',
                    contact:
                    {
                        name: 'Amirhossein Ghodratnema',
                        url: 'Amirhosseinghodratnema.ir',
                        email: 'Amirhosseinghodratnema@gmail.com'
                    }
                },
                servers: [
                    { url: 'http://localhost:8000' }
                ]

            },
            apis: [path.join(__dirname, 'router', '**', '*.js')],
        })));
    };



    // Create server
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);    // Create server.
        const io = initialSocket(server);
        socketHandler(io);
        server.listen(PORT, console.log(`Server: Running server on port ${PORT}...`.cyan.bold.italic))    // Runnin server.
    };

    // Connect to DB.
    configDatabase(DB_URL) {
        const { mongoose } = require('mongoose');
        mongoose.connect(DB_URL, console.log(`MongoDB: Connecting MongoDB: ${process.env.DB_CONNECT}...`.black.bold.italic));    // Connect to mongodb.

        // Connection alert
        mongoose.connection.on('connected', () => {
            console.log('MongoDB: Mongoose connected to DB'.black.bold.italic)
            console.log('-------- Server start up --------'.blue.bold.italic);
            console.log()
        });

        // Disconneted alert
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB: Mongoose connection desconnected'.black.bold.bold.italic);
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();    // Close connectin to DB
            process.exit(0);    // Close connection to DB
        })
    };

    // Create route to web and api.
    createRoute() {
        this.#app.use(AllRoutesApi);    // Set api route.
        this.#app.use(AllRoutesWeb);
    };

    // Error handler full.
    errorHandler() {
        this.#app.use(notFoundError)    // Not found error (404) handler.
        this.#app.use(errorHandler)    // Errorhandler all errors.
    };

    innitRedis() {
        require('./utils/init_redis');
    };

    initTemplateEngin() {
        this.#app.use(expressEjsLayouts)    // Set layout for ejs.
        this.#app.set('view engine', 'ejs')    // View engin config.
        this.#app.set('views', path.join(__dirname, 'resource', 'views'))    // Views path.
        this.#app.set('layout extractStyles', true)    // Style confin ejs.
        this.#app.set('layout extractScripts', true)    // Script config ejs.
        this.#app.set('layout', './layouts/master')    // Leyout confing for ejs.
    };
};


