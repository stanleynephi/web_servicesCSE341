const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" })

const doc = {
  info: {
    version: "3.0.0", // by default: '1.0.0'
    title: "Contact API Documentation", // by default: 'REST API'
    description: "API Documentation for Project", // by default: ''
  },
  servers: [
    {
      url: "https://web-servicescse341.onrender.com",
      description: "API Description",
    },
  ],
}

const outputFile = "./swagger-output.json"
const routes = ["./router/index.js"]

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc)
