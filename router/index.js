/**handling routing related commands based of request from client */
const router = require("express").Router()
const controller = require("../controller/index")
const swaggerUi = require("swagger-ui-express")
const swaggerDocumentation = require("../swagger-output.json")
const validation = require("../utils/validate")

//swagger ui route
router.use("/api-docs", swaggerUi.serve)
router.get("/api-docs", swaggerUi.setup(swaggerDocumentation))

//router and http verbs.
router.get("/getAll", controller.getAllContact)
router.get("/getContact/:id", controller.getContactbyId)
//delete by id
router.delete("/deleteContact/:id", controller.DeleteContactbyId)
//add contact
router.post(
  "/newContact",
  validation.validationRules(),
  validation.validationRegistration,
  controller.addContact
)
//update information
router.put("/updateContact/:id", controller.updateInformation)
//export router
module.exports = router
