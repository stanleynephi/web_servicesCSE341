/**handling routing related commands based of request from client */
const router = require("express").Router()
const controller = require("../controller/index")

//router and http verbs.
router.get("/getAll", controller.RetrieveAllMovies)
router.get("/getContact/:id", controller.RetrieveMoviebyId)

//export router
module.exports = router
