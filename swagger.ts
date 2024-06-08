import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Deel Api Doc',
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: '',
        },
    ],
    securityDefinitions: {
        ProfileIdHeader: {
            type: 'apiKey',
            name: 'profile_id',
            in: 'header',
        },
    },
    security: [
        {
            ProfileIdHeader: [],
        },
    ],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
