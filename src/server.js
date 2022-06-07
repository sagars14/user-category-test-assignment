require('dotenv').config()
require('./passport/passport')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
const express = require('express')
const initializeDatabaseConnection = require('./db/db.config')
const routes = require('./routes/index')

const app = express()

const { PORT } = require('./constants')

const { ORIGIN_URL } = process.env

initializeDatabaseConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    credentials: true,
    origin: `${ORIGIN_URL}`,
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)

app.use('/', routes)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API for User-Categories',
    version: '1.0.0',
    description:
      'This API is made with Express. It retrieves data from mongodb.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Sagar Sharma',
      url: 'https://deqode.com',
    },
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
  authAction: {
    JWT: {
      name: 'JWT',
      schema: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
      value: 'Bearer <JWT>',
    },
  },
}

const swaggerSpec = swaggerJsdoc(options)

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on port: ${PORT}`)
})
