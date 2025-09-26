/**create a client for the mongodb database */
require("dotenv").config()

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri = process.env.MONGODBURI

//create the client options for the connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const run = async function () {
  try {
    //connect client to the server
    await client.connect()
    //send a ping and cosole log message
    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You Successfully connected to the database"
    )
  } catch (error) {
    console.log(error)
  }
}

//export client
module.exports = { run, client }
