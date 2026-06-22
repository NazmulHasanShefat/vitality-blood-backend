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
    const result = await requestCollection.find(query).sort({ _id: -1 }).limit(3).toArray();
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

const updateDonationRequest = async(req, res)=>{
  const {id} = req.params;
  const updatedDocument = req.body;
  const newDocument = {
    ...updatedDocument,
    updatedAt: new Date()
  }

  const newUpdatedDocument = {
    $set:{
      ...newDocument
    }
  }
  try {
     const query = { _id: new ObjectId(id) };
    const requestCollection = await getCollection("request");
    const result = await requestCollection.updateOne(query, newUpdatedDocument);
    return res.json(result);
  } catch (error) {
    return console.log(error)
  }
}

module.exports = { 
    createDonation,
    getDonorDonationRequests,
    getDonationDetails,
    updateDonationRequest,
    getRecentDonorDonationRequests
 };
