const mongoose = require("mongoose");
require("dotenv").config();

const { DB_NAME, DB_HOST } = process.env;
const URL = `${DB_HOST}/${DB_NAME}`;

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    throw error;
  }
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports = { closeDatabase, clearDatabase, connectToDatabase };
