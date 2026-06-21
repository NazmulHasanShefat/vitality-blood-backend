const express = require("express");
const app = express();
const cors = require("cors");
const { appRouter } = require("./routes/routes.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message: "server is running"})
})

app.use("/api/",  appRouter)

module.exports = { app };