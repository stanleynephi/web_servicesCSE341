const express = require("express")
const app = express()
const { run } = require("./database/index")

const port = process.env.PORT || 8000
const host = process.env.HOST || "localhost"

//set up the express.json
app.use(express.json())

//app routing set-up
app.use("/", require("./router"))

app.listen(port, async () => {
  await run()
  console.log("Database Running")
  console.log(`${host}`)
})
