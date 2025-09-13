/**communicate with the database collection to query database using the listAllCollection funtion
 * to connect to the needed collection
 */

const { ObjectId } = require("mongodb")
const {
  listAllCollection,
  getCollectionData,
  getCollectionDatabyId,
} = require("../database/collection")

//retrieve all data from the database
const RetrieveAllMovies = async (req, res) => {
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

module.exports = { RetrieveAllMovies, RetrieveMoviebyId }
