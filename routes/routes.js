const express = require("express");
const { createDonation, getDonorDonationRequests, getDonationDetails, updateDonationRequest, getRecentDonorDonationRequests } = require("../controllers/donation.js");
const appRouter = express.Router();

appRouter.post("/create-donatio-request", createDonation);
appRouter.get("/get-donor-donation-request/:id", getDonorDonationRequests);
appRouter.get("/get-donation-detail/:id", getDonationDetails);
appRouter.patch("/update-donation-request/:id", updateDonationRequest);
appRouter.get("/get-recent-donor-request", getRecentDonorDonationRequests);


module.exports = {appRouter}