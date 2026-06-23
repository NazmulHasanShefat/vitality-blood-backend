const express = require("express");
const { createDonation, getDonorDonationRequests, getDonationDetails, updateDonationRequest, getRecentDonorDonationRequests, updateDonationStatus, deleteDonationRequest, filterDonationRequest, getAllDonationRequest } = require("../controllers/donation.js");
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

module.exports = {appRouter}