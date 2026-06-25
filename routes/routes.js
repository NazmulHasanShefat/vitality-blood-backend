const express = require("express");
const { createDonation, getDonorDonationRequests, getDonationDetails, updateDonationRequest, getRecentDonorDonationRequests, updateDonationStatus, deleteDonationRequest, filterDonationRequest, getAllDonationRequest, getPedingBloodDonationRequest } = require("../controllers/donation.js");
const { createfundingHistory } = require("../controllers/funding.js");
const { updateProfile } = require("../controllers/user.js");
const appRouter = express.Router();

appRouter.post("/create-donatio-request", createDonation);
appRouter.get("/get-donor-donation-request/:id", getDonorDonationRequests);
appRouter.get("/get-donation-detail/:id", getDonationDetails);
appRouter.patch("/update-donation-request/:id", updateDonationRequest);
appRouter.get("/get-recent-donor-request/:id", getRecentDonorDonationRequests);
appRouter.patch("/update-donation-status/:id", updateDonationStatus);
appRouter.delete("/delete-donation-request/:id", deleteDonationRequest);
appRouter.get("/filter-donation-request/:id", filterDonationRequest);
appRouter.get("/all-donation-requests", getAllDonationRequest);
appRouter.post("/createFundingHistory", createfundingHistory);
appRouter.patch("/update-user/:id", updateProfile);
appRouter.get("/get-pending-blood-donation-request", getPedingBloodDonationRequest)

module.exports = {appRouter}