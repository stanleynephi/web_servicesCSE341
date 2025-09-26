const express = require("express")
const createError = require("http-errors")
const app = express()
const { run } = require("./database/index")

const port = process.env.PORT || 8000
const host = process.env.HOST || "localhost"

//set up the express.json
app.use(express.json())

//app routing set-up
app.use("/", require("./router"))

// 404 handler (no matching route)
app.use((req, res, next) => {
  next(createError(404, "Not found"))
})

// Global error handler (must have 4 args!)
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Something went wrong")
})

app.listen(port, async () => {
  await run()
  console.log("Database Running")
  console.log(`${host}`)
})
