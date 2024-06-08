import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from '../swagger_output.json'
import mainRouter from './routes'
import Database from './config/db'

export default class Server {
    readonly expressInstance: express.Express

    constructor() {
        this.expressInstance = express()
        this.initDb()
        this.middlewareSetup()
        this.routingSetup()
    }

    private initDb() {
        Database.getInstance()
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.')
            })
            .catch((err) => {
                console.error('Unable to connect to the database:', err)
            })
    }

    private middlewareSetup() {
        // Setup requests gZip compression
        this.expressInstance.use(compression())
        // Setup common security protection
        this.expressInstance.use(helmet())
        // Setup Cross Origin access
        this.expressInstance.use(cors())
        // Setup requests format parsing (Only JSON requests will be valid)
        this.expressInstance.use(bodyParser.urlencoded({ extended: true }))
        this.expressInstance.use(bodyParser.json())
        this.expressInstance.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerOutput)
        )
    }

    private routingSetup() {
        // Instantiate mainRouter object
        const router = new mainRouter().router
        // Add to server routes
        this.expressInstance.use('/', router)
    }
}
