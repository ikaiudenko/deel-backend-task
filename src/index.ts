import http from 'http'
import expressServer from './server'
import dotenv from 'dotenv'
import { Model } from 'sequelize'
dotenv.config()

declare global {
    namespace Express {
        interface Request {
            profile: Model
        }
    }
}

const port = Number(process.env.PORT)

// Instantiate the expressServer class
export const expressInstance = new expressServer().expressInstance

// Create the HTTP Express Server
export const server = http.createServer(expressInstance)

server.listen(port)
server.on('error', onError)

function onError(error: NodeJS.ErrnoException): void {
    console.error(`An error occurred: ${JSON.stringify(error)}`)
    process.exit(1)
}
