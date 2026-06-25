const { getCollection } = require("../db/dbConnection.js")

const getAllStates = async(req, res)=>{
    try {
        const userCollection = await getCollection("user");
        const requestCollection = await getCollection("request");
        const fundCollection = await getCollection("founding");
         const result = await fundCollection.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $toDouble: "$transactionAmount" }
          }
        }
      }
    ]).toArray();
    const usersQuery = {status: "active"}
      const totalFunds = result[0]?.totalAmount || 0;
      const totalRequests = await requestCollection.countDocuments();
      const total_active_users = await userCollection.countDocuments();
      res.json({totalFunds, totalRequests, total_active_users })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {getAllStates}