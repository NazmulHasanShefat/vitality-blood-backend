const express = require("express");
const dotenv = require("dotenv");
const dns = require("node:dns");
const { app } = require("./app.js");
const { connectDB } = require("./db/dbConnection.js");
dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config();
const port = process.env.PORT || 5000;

connectDB().then(() => {
  console.log("✅ dbConneted Successfully");
  app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
  });
}).catch((error)=>{
     console.log("❌ DB connection failed", error);
    process.exit(1);
})