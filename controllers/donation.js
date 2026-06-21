const { getCollection } = require("../db/dbConnection.js")

const createDonation = async (req, res)=>{
    const collectionInfo = req.body;
    try {
        const newRequest = {
            ...collectionInfo,
            createdAt: new Date()
        }
        const requestCollection = await getCollection("request");
        const result = await requestCollection.insertOne(newRequest);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createDonation}