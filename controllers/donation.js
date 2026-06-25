const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection.js");

const createDonation = async (req, res) => {
  const collectionInfo = req.body;
  try {
    const newRequest = {
      ...collectionInfo,
      createdAt: new Date(),
    };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.insertOne(newRequest);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getDonorDonationRequests = async (req, res) => {
  const { id } = req.params;
  try {
    const query = { requesterId: id };

    const requestCollection = await getCollection("request");
    const result = await requestCollection.find(query).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getRecentDonorDonationRequests = async (req, res) => {
  const { id } = req.params;
  const limit = req.query;
  try {
    const query = { requesterId: id };

    const requestCollection = await getCollection("request");
    const result = await requestCollection
      .find(query)
      .sort({ _id: -1 })
      .limit(3)
      .toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getDonationDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const query = { _id: new ObjectId(id) };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.findOne(query);
    return res.json(result);
  } catch (error) {
    return console.log(error);
  }
};

const updateDonationRequest = async (req, res) => {
  const { id } = req.params;
  const updatedDocument = req.body;
  const newDocument = {
    ...updatedDocument,
    updatedAt: new Date(),
  };

  const newUpdatedDocument = {
    $set: {
      ...newDocument,
    },
  };
  try {
    const query = { _id: new ObjectId(id) };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.updateOne(query, newUpdatedDocument);
    return res.json(result);
  } catch (error) {
    return console.log(error);
  }
};

const updateDonationStatus = async (req, res) => {
  const { status } = req.body;
  const donorInfo = req.body;
  const { id } = req.params;
  try {
    const query = { _id: new ObjectId(id) };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.updateOne(query, {
      $set: {
        donationStatus: status,
        ...donorInfo,
      },
    });
    return res.json(result);
  } catch (error) {
    return console.log(error);
  }
};

const deleteDonationRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const query = { _id: new ObjectId(id) };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.deleteOne(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const filterDonationRequest = async (req, res) => {
  const { id } = req.params;
  const myquery = {};
  try {
    if (req.query.searchQuery) {
      myquery.donationStatus = req.query.searchQuery;
    }
    const query = { requesterId: id, ...myquery };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.find(query).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllDonationRequest = async (req, res) => {
 const myquery = {};
  try {
    if (req.query.searchQuery) {
      myquery.donationStatus = req.query.searchQuery;
    }
    const requestCollection = await getCollection("request");
    const result = await requestCollection.find(myquery).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getPedingBloodDonationRequest = async (req, res) => {
  const query = {};
  const page = parseInt(req.query.page) || 1; // default page 1
  const limit = parseInt(req.query.limit) || 8; // default 10 items
  const skip = (page - 1) * limit;

  try {
    if (req.query.donationStatus) {
      query.donationStatus = req.query.donationStatus;
    }
    if (req.query.bloodGroup) {
      query.bloodGroup = req.query.bloodGroup;
    }
    if (req.query.recipientDivision) {
      query.recipientDivision = req.query.recipientDivision;
    }
    if (req.query.recipientDistrict) {
      query.recipientDistrict = req.query.recipientDistrict;
    }
    const requestCollection = await getCollection("request");
     const total = await requestCollection.countDocuments(query);
    const result = await requestCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    return res.json({
      success: true,
      data: result,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDonation,
  getDonorDonationRequests,
  getDonationDetails,
  updateDonationRequest,
  getRecentDonorDonationRequests,
  updateDonationStatus,
  deleteDonationRequest,
  filterDonationRequest,
  getAllDonationRequest,
  getPedingBloodDonationRequest,
};
