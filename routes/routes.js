const express = require("express");
const { createDonation, getDonorDonationRequests, getDonationDetails, updateDonationRequest, getRecentDonorDonationRequests, updateDonationStatus, deleteDonationRequest, filterDonationRequest, getAllDonationRequest, getPedingBloodDonationRequest } = require("../controllers/donation.js");
const { createfundingHistory, getTransactionHistory } = require("../controllers/funding.js");
const { updateProfile } = require("../controllers/user.js");
const { verifyUser, verifyAdmin } = require("../middleware/verifyUser.js");
const { getAllStates } = require("../controllers/states.js");
const appRouter = express.Router();

appRouter.post("/create-donatio-request", verifyUser, createDonation);
appRouter.get("/get-donor-donation-request/:id", verifyUser, getDonorDonationRequests);
appRouter.get("/get-donation-detail/:id", verifyUser, getDonationDetails);
appRouter.patch("/update-donation-request/:id", verifyUser, updateDonationRequest);
appRouter.get("/get-recent-donor-request/:id", verifyUser, getRecentDonorDonationRequests);
appRouter.patch("/update-donation-status/:id", verifyUser, updateDonationStatus);
appRouter.delete("/delete-donation-request/:id", verifyUser, deleteDonationRequest);
appRouter.get("/filter-donation-request/:id", verifyUser, filterDonationRequest);
appRouter.get("/all-donation-requests", verifyUser, verifyAdmin, getAllDonationRequest);
appRouter.post("/createFundingHistory", verifyUser, createfundingHistory);
appRouter.patch("/update-user/:id", verifyUser, updateProfile);
appRouter.get("/get-pending-blood-donation-request", getPedingBloodDonationRequest);
appRouter.get("/get-transaction-history", getTransactionHistory);
appRouter.get("/get-all-states", verifyUser, getAllStates)

module.exports = {appRouter}