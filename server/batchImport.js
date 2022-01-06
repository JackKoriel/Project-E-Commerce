// used to import all of the companies and items to mongodb data base

let fs = require("file-system");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = JSON.parse(fs.readFileSync("data/companies.json"));
const items = JSON.parse(fs.readFileSync("data/items.json"));
const categories = JSON.parse(fs.readFileSync("./data/categories.json"));

const batchImport = async () => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    const db = client.db("GroupProject");

    await db.collection("companies").insertMany(companies);
    await db.collection("items").insertMany(items);
    await db.collection("categories").insertMany(categories);

    client.close();
  } catch (err) {
    console.log(err);
  }
};

batchImport();
