const express = require("express");
const { createDonation } = require("../controllers/donation.js");
const appRouter = express.Router();

appRouter.post("/create-donatio-request", createDonation)

module.exports = {appRouter}