const cookieParser = require('cookie-parser');

// My require
const { route: ApiRoute } = require('./router/api/router');
const { errorHandler, notFoundError } = require('./errors/errorHandlers');
const { AllRoutesApi } = require('./router/api/router');
const { AllRoutesWeb } = require('./router/web/router');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors')

module.exports = class Application {

    #express = require('express');    // Require express private.
    #app = this.#express();    // Get app in express and private.

    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL);    // Configuration DB.
        this.confiApplication();    // Configuration application.
        this.createServer(PORT);    // Create server.
        this.createRoute();    // Create routes
        this.errorHandler();    // Error handlers.
    };

    //  Server configuration
    confiApplication() {
        const path = require('path');

        // Opitons config.
        this.#app.use(cors());
        this.#app.use(morgan('dev'));    // Loger
        this.#app.use(this.#express.json())    // Json body-parser setting.
        this.#app.use(this.#express.urlencoded({ extended: true }));    // urlencoded body-parser setting.
        this.#app.use(this.#express.static(path.join(__dirname, './public')));    // Set static files.
        this.#app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSER));    // Set cookie-parser and secret-key. 

        // View engine config. 
        this.#app.set('view engine', 'ejs');    // Set view engine,
        this.#app.set('views', path.join(__dirname, 'views'));    // Set dir view file.

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
        server.listen(PORT, console.log(`Running server on port ${PORT}...`))    // Runnin server.
    };

    // Connect to DB.
    configDatabase(DB_URL) {
        const { mongoose } = require('mongoose');
        mongoose.connect(DB_URL, console.log(`Connect db successfull to: ${process.env.DB_CONNECT}...`));    // Connect to mongodb.

        // Connection alert
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB')
        });

        // Disconneted alert
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection desconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();    // Close connectin to DB
            process.exit(0);    // Close connection to DB
        })
    };

    // Create route to web and api.
    createRoute() {
        this.#app.use(AllRoutesApi);    // Set api route.
        // this.#app.use(AllRoutesWeb);    // Set api route.
    };

    // Error handler full.
    errorHandler() {
        this.#app.use(notFoundError)    // Not found error (404) handler.
        this.#app.use(errorHandler)    // Errorhandler all errors.
    };
}


