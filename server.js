const express = require("express")
const app = express()
const { run } = require("./database/index")

const port = process.env.PORT || 8000
const host = process.env.HOST

//app routing set-up
app.use("/", require("./router"))

app.listen(port, async () => {
  await run()
  console.log("Database Running")
})
