/**this handles the collections in our database */
const express = require("express")
const { run, client } = require("./index")
const { ObjectId } = require("mongodb")

/**funtion to connect to database and show all the collections available */
const listAllCollection = async function () {
  const database = client.db("contacts")

  if (!database) {
    console.log("No database connection")
    return []
  }

  console.log("Database connection established")

  //handles the available collections
  const collections = []
  const coll = database.listCollections({}, { nameOnly: true })
  for await (const doc of coll) {
    collections.push(doc.name)
  }

  return collections
}

//function to get specific collection
const getCollectionData = async (collectionName) => {
  const database = client.db("contacts")
  const collection = database.collection(collectionName)

  if (!collection) {
    console.log(`Collection ${collectionName} not found`)
    return []
  }

  const docs = await collection.find({}).limit(100).toArray()
  if (!docs) {
    console.log("No Data")
  }
  console.log(docs)
  console.log(`Fetched ${docs.length} Contacts`)
  return docs
}

//function get movie by id
const getCollectionDatabyId = async (collectionName, id) => {
  const database = client.db("contacts")
  const collection = database.collection(collectionName)

  if (!collection) {
    console.log(`Collection ${collectionName} not found`)
    return []
  }
  let objectId
  try {
    objectId = new ObjectId(id)
  } catch (error) {
    console.log(error)
  }

  const data = await collection.findOne({ _id: objectId })
  if (!data) {
    console.log("No Contact Information Found")
    return "No Contact Found"
  }
  return data
}

module.exports = { listAllCollection, getCollectionData, getCollectionDatabyId }
