/**communicate with the database collection to query database using the listAllCollection funtion
 * to connect to the needed collection
 */

const { ObjectId } = require("mongodb")
const {
  listAllCollection,
  getCollectionData,
  getCollectionDatabyId,
  deleteDatabyId,
  addContacttoDatabase,
  updateContactInformation,
} = require("../database/collection")

//retrieve all data from the database
const getAllContact = async (req, res) => {
  const collection = await listAllCollection()
  console.log(collection)

  //get all movie data from the collection
  const contacts = await getCollectionData("contact_Infromation")
  contacts.forEach((contact) => {
    console.log(contact.firstname)
  })
  res.setHeader("Content-Type", "application/json")
  res.status(200).json(contacts)

  return contacts
}

//retrieve data by id.
const RetrieveMoviebyId = async (req, res) => {
  try {
    const contact_Id = new ObjectId(req.params.id)
    console.log(contact_Id)

    //get movie data based of the id provided
    const contact = await getCollectionDatabyId(
      "contact_Infromation",
      contact_Id
    )
    //get the movies id and compare with the movieid
    //send response to json
    console.log(contact)
    res.status(200).json(contact)
    return contact
  } catch (error) {
    console.log(error)
  }
}

//delete data by id
const DeleteContactbyId = async (req, res) => {
  //get the id needed
  try {
    const contact_Id = new ObjectId(req.params.id)
    console.log(contact_Id)

    //get the data to be deleted
    const contact = await deleteDatabyId("contact_Infromation", contact_Id)

    if (!contact) {
      console.log(`No contact found`)
    }

    res.status(200).json({ message: "Contact Deleted" })
  } catch (error) {
    console.log(error)
  }
}

//add contact to database
const addContact = async (req, res) => {
  //retrieve needed data from the forms using body
  const data = req.body
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
const updateInformation = async (req, res) => {
  //retrieve the accound id
  const contactId = new ObjectId(req.params.id)
  console.log(contactId)

  //retrieve data from the forms
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
      console.log(`Error with the update`)
      return `Error with the update`
    }

    res.status(200).json({ message: "Contact Updated" })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllContact,
  RetrieveMoviebyId,
  DeleteContactbyId,
  addContact,
  updateInformation,
}
