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

//delete contact by id
const deleteDatabyId = async (collectionName, id) => {
  // connect to the database and search for the collection
  const database = client.db("contacts")
  const collection = database.collection(collectionName)

  //check if collection is found
  if (!collection) {
    console.log(`collection not found ${collectionName}`)
    return []
  }

  //collection is found now look up for the data with the id provided
  //init the objectId
  let objectId
  try {
    objectId = new ObjectId(id)

    //find a contact with the id provided in the collection
    const contact = await collection.findOne({ _id: objectId })

    //check if the data is found
    if (!contact) {
      console.log(`contact you are lookig for can not be found`)
    }
    console.log(contact)

    //delete the data from the collection
    const deleteContact = await collection.deleteOne({ _id: objectId })
    if (!deleteContact) {
      console.log("Contact deletion fails")
      return "Contact deletion fails"
    }
    console.log("Contact successfully deleted")
    return "Contact successfully deleted"
  } catch (error) {
    console.log(error)
  }
}

//add new content to the database collection
const addContacttoDatabase = async (collectionName, contactInformation) => {
  //connect to the database and the collection to use
  const database = client.db("contacts")
  const collection = database.collection(collectionName)

  if (!collection) {
    console.log(`Collection not found`)
    return []
  }

  try {
    //get the contact informations and insert it into the database
    const addedData = await collection.insertOne(contactInformation)

    //check if data was added to collection
    if (!addedData) {
      console.log(`Data addition failed`)
      return `Data addition failed`
    }
  } catch (error) {
    console.log(error)
  }

  console.log(`Data added successfully`)
  return `Data added successfully`
}

//update contact informations
const updateContactInformation = async (collectionName, id, updatedData) => {
  //connect to database and find the collection
  const database = client.db("contacts")
  const collection = database.collection(collectionName)

  if (!collection) {
    console.log(`Collection not found`)
    return []
  }

  try {
    const filter = { _id: id }
    const updatedata = {
      $set: updatedData,
    }
    const updateContact = await collection.updateOne(filter, updatedata)

  if (updateContact.matchedCount === 0) {
    console.log(`No document found with id: ${id}`)
    return null
  }

    console.log(`Data Updated Successfully`)
    return `Data updated successfully`
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listAllCollection,
  getCollectionData,
  getCollectionDatabyId,
  deleteDatabyId,
  addContacttoDatabase,
  updateContactInformation,
}
