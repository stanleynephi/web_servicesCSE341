/**communicate with the database collection to query database using the listAllCollection funtion
 * to connect to the needed collection
 */
const { ObjectId } = require("mongodb")
const createError = require("http-errors")
const {
  listAllCollection,
  getCollectionData,
  getCollectionDatabyId,
  deleteDatabyId,
  addContacttoDatabase,
  updateContactInformation,
} = require("../database/collection")

//retrieve all data from the database
const getAllContact = async (req, res, next) => {
  try {
    const collection = await listAllCollection()
    console.log(collection)

    //get all movie data from the collection
    const contacts = await getCollectionData("contact_Infromation")

    //set a conditional statement for when data is empty
    if (!contacts) {
      throw createError(404, "Nothing found in the database")
    }

    contacts.forEach((contact) => {
      console.log(contact.firstname)
    })
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(contacts)

    return contacts
  } catch (error) {
    console.log(error.message)
    next(error.message)
  }
}

//retrieve data by id.
const getContactbyId = async (req, res, next) => {
  try {
    const contact_Id = new ObjectId(req.params.id)
    console.log(contact_Id)

    //get movie data based of the id provided
    const contact = await getCollectionDatabyId(
      "contact_Infromation",
      contact_Id
    )

    //if there is nothing found then return a 404 error
    if (!contact) {
      //throw errow
      throw createError(404, "No contact found, Check back later")
    }
    //get the movies id and compare with the movieid
    //send response to json
    console.log(contact)
    res.status(200).json(contact)
    return contact
  } catch (error) {
    //check the instance of the error using mongodb
    if (error.name === "BSONError") {
      //thow the error
      return next(
        createError(400, "Invalid Product Id Oops Please check the Id")
      )
    }
    next(error)
  }
}

//delete data by id
const DeleteContactbyId = async (req, res, next) => {
  //get the id needed
  try {
    const contact_Id = new ObjectId(req.params.id)
    console.log(contact_Id)

    //get the data to be deleted
    const contact = await deleteDatabyId("contact_Infromation", contact_Id)

    if (!contact) {
      throw createError(404, "No Contact Found")
    }
    res.status(200).json({ message: "Contact Deleted" })
  } catch (error) {
    console.log(error)
    //check if the error is id based
    if (error.name === "BSONError") {
      //thow the error
      return next(
        createError(400, "Invalid Product Id Oops Please check the Id")
      )
    }
    next(error)
  }
}

//add contact to database
const addContact = async (req, res) => {
  //retrieve needed data from the forms using body
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday,
  }
  console.log(data)
  if (!data) {
    console.log("No contact data found")
  }

  try {
    const insertData = addContacttoDatabase("contact_Infromation", data)

    if (!insertData) {
      console.log(`No data inserted`)
    }

    console.log(`Data inserted`)
    res.status(200).json({ message: "Data Added Successfully" })
  } catch (error) {
    console.log(error)
  }
}

//update the contact information
const updateInformation = async (req, res, next) => {
  //retrieve the accound id
  const contactId = new ObjectId(req.params.id)
  //check if the id exist
  if (!contactId) {
    throw createError(
      404,
      "Contact Not Found, Id does not match with any contact"
    )
  }

  //retrieve new data from the forms
  //new data has been validated before being sent here
  const updateData = req.body

  //get existing data
  const existingData = await getCollectionDatabyId(
    "contact_Infromation",
    contactId
  )

  try {
    //prepare the forms and get rid of any unchanged forms
    const newData = {
      firstname:
        updateData.firstname && updateData.firstname.trim() !== "any"
          ? updateData.firstname
          : existingData.firstname,

      lastname:
        updateData.lastname && updateData.lastname.trim() !== "any"
          ? updateData.lastname
          : existingData.lastname,

      email:
        updateData.email && updateData.email.trim() !== "any"
          ? updateData.email
          : existingData.email,

      favouriteColor:
        updateData.favouriteColor && updateData.favouriteColor.trim() !== "any"
          ? updateData.favouriteColor
          : existingData.favouriteColor,

      birthday:
        updateData.birthday && updateData.birthday.trim() !== "any"
          ? updateData.birthday
          : existingData.birthday,
    }

    //perform the update
    const result = await updateContactInformation(
      "contact_Infromation",
      contactId,
      newData
    )

    if (!result) {
      throw createError(404, "Contact Update Unsuccessful")
    }

    console.log(`Data inserted`)
    res.status(200).json({ message: "Contact Updated Successfully" })
  } catch (error) {
    console.log(error)
    if (error.name === "BSONError") {
      //thow the error
      return next(
        createError(400, "Invalid Product Id Oops Please check the Id")
      )
    }
    next(error)
  }
}
module.exports = {
  getAllContact,
  getContactbyId,
  DeleteContactbyId,
  addContact,
  updateInformation,
}
