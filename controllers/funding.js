const { getCollection } = require("../db/dbConnection.js");

const createfundingHistory = async (req, res) => {
  const fundData = req.body;
  const newFoundData = {
    ...fundData,
    createdAt: new Date(),
  };
  try {
    const foundCollection = await getCollection("founding");
    const trxId = fundData.transactionId;
    const checkdup = await foundCollection.findOne({transactionId: trxId});

    // await foundCollection.createIndex({ transactionId: 1 }, { unique: true });
    if(!checkdup){
        const result = await foundCollection.insertOne(newFoundData);
        return res.json(result);
    }else{
        return res.json({message: "same data is exists"})
    }
  } catch (error) {
    console.log(error);
  }
};


const getTransactionHistory = async(req, res)=>{
  try {
     const fundCollection = await getCollection("founding");
     const result = await fundCollection.find().toArray();
     res.json(result);
  } catch (error) {
    console.log(error)
  }
}
module.exports = { createfundingHistory, getTransactionHistory };
