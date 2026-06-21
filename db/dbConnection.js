const { MongoClient, ServerApiVersion } = require("mongodb");

let db = null;

const connectDB = async () => {
  if (db) return db;

  const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  // await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  db = client.db("vitality");
  return db;
};

/**
 * @returns {import('mongodb').Collection}  //for suggestion i using this line of code
 */

const getCollection = async (collectionName) => {
  try {
    const databse = await connectDB();
    return databse.collection(collectionName);
  } catch (error) {
    console.log("faild to fetch collection Error:", error);
  }
};

module.exports = { connectDB, getCollection };