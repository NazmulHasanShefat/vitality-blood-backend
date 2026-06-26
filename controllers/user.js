const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection.js");

const updateProfile = async(req, res)=>{
    const userData = req.body;
    const {id} = req.params;
    const filter = {_id: new ObjectId(id)}
    const newUpdatedDocument = {
        $set:{
            ...userData,
            updatedAt: new Date()
        }
    }
    try {
        const userCollection = await getCollection("user");
        const result = await userCollection.updateOne(filter, newUpdatedDocument);
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}


const checkUserStatus = async (req, res)=>{
    const {id} = req.params;
    const query = {_id: new ObjectId(id)}
    try {
        const userCollection = await getCollection("user");
        const result = await userCollection.findOne(query);
        res.json(result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {updateProfile, checkUserStatus}