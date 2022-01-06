"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//importing standard stuff
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// api functions

////////////////////////////////////////////////////////////////////////////

// all items from server

const getAllItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("GroupProject");

    const results = await db.collection("items").find().toArray();

    results
      ? res.status(200).json({ status: 200, results })
      : res.status(404).json({ status: 404, data: "Items not found" });

    client.close();
  } catch {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  }
};

// gets a single item by id# from server -----------------------------------

const getItems = async (req, res) => {
  //declaring a variable to use in my res status
  let displayedData;
  //getting the queries from the user
  let { start, limit } = req.query;
  //we change to Numbers because queries come in string form
  let startNum = Number(start);
  let limitNum = Number(limit);
  //this will be usefull for the calcs later
  let bothLimits = Number(start) + Number(limit);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");
    const results = await db.collection("items").find().toArray();

    // validations and user control
    if (results.length === 0) {
      res.status(404).json({ status: 404, data: "Items not found" });
    }
    if (!limit && !start) {
      displayedData = results.slice(0, 9);
    } else if (!limit) {
      displayedData = results.slice(startNum, startNum + 9);
    } else if (!start || start > results.length) {
      displayedData = results.slice(0, limitNum);
    } else if (startNum + limitNum > results.length) {
      displayedData = results.slice(startNum, results.length + 1);
    } else {
      displayedData = results.slice(startNum, startNum + limitNum);
    }
    res.status(200).json({
      status: 200,
      message: "Success",
      data: displayedData,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// gets all companies in database --------------------------------------

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("companies").find().toArray();

    results
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: "Company not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// get company by ID getCompaniesById
const getCompaniesById = async (req, res) => {
  const { _id } = req.params;
  let id = Number(_id);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("companies").findOne({ _id: id });
    results
      ? res.status(200).json({ status: 200, data: results.name })
      : res.status(404).json({ status: 404, data: "Company not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// gets a single item by id# from server ---------------------------------------

const getItemById = async (req, res) => {
  const { _id } = req.params;

  let id = Number(_id);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("items").findOne({ _id: id });

    results
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: "Items not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// gets items by category from server ----------------------------------------

const getItemByCategory = async (req, res) => {
  const { type } = req.query;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("items").find().toArray();

    const cat = results.filter((item) => {
      return item.category.toLowerCase() === type.toLowerCase();
    });
    cat
      ? res.status(200).json({ status: 200, data: cat })
      : res.status(404).json({ status: 404, data: "Items not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// gets items by companyId from server ----------------------------------------

const getItemByCompany = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("items").find().toArray();

    const comp = results.filter((item) => {
      return Number(item.companyId) === Number(_id);
    });
    comp
      ? res.status(200).json({ status: 200, data: comp })
      : res.status(404).json({ status: 404, data: "Company not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// adds items to cart in the server --------------------------------------------
// removes item from stock

const addItems = async (req, res) => {
  const { _id, numInStock } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  // validation for stock quantity
  if (numInStock === 0) {
    return res.status(400).json({
      status: 400,
      message: "Item is out of stock.",
    });
  }

  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("cart").insertMany([
      {
        ...req.body,
        numInStock: numInStock - 1,
      },
    ]);

    const query = { _id };

    const newValues = { $set: { numInStock: numInStock - 1 } };

    await db.collection("items").updateOne(query, newValues);

    res.status(201).json({ status: 201, message: "Item added", data: results });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// removes an item from cart ------------------------------------------------
// adds back to stock

const deleteItemFromCart = async (req, res) => {
  const { _id } = req.params;
  let id = Number(_id);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");

    const itemInCart = await db.collection("cart").findOne({ _id: id });

    const query = { _id: id };

    const newValues = { $set: { numInStock: itemInCart.numInStock + 1 } };

    await db.collection("items").updateOne(query, newValues);
    await db.collection("cart").deleteOne({ _id: id });

    res.status(200).json({ status: 200, message: "Item removed" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// gets all items that are in your cart from server -----------------------------

const getCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("cart").find().toArray();

    results
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: "Items not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

// post username and email
const addUser = async (req, res) => {
  const _id = uuidv4();
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).json({
      status: "error",
      message: "Some info is missing, please fill all fields.",
    });
  } else if (!email.includes("@")) {
    res.status(400).json({
      status: "error",
      message: "Please provide a valid email address.",
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");

    let newUser = await db.collection("users").insertOne({ ...req.body, _id });

    res.status(200).json({ status: 200, data: newUser });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again later.",
      });
  } finally {
    client.close();
  }
};

///login verifications
const getUser = async (req, res) => {
  const { email } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const user = await db.collection("users").findOne({ email });

    user
      ? res.status(200).json({ status: 200, data: user })
      : res.status(404).json({
          status: 404,
          data: "Incorrect user, please provide the correct email address",
        });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//credit card verification
const addCreditCards = async (req, res) => {
  const _id = uuidv4();
  const { name, cardNum, security, expiration } = req.body;

  if (!name || !cardNum || !security || !expiration) {
    res.status(400).json({
      status: 400,
      message: "Some info is missing, please fill all fields.",
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");

    let newCC = await db
      .collection("creditCards")
      .insertOne({ ...req.body, _id });

    res
      .status(201)
      .json({ status: 201, message: "Credit card accepted.", data: newCC });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again later.",
      });
  } finally {
    client.close();
  }
};

//get all the categories
const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");

    const allCategories = await db.collection("categories").find().toArray();
    allCategories
      ? res.status(200).json({ status: 200, data: allCategories })
      : res.status(404).json({ status: 404, data: "Category not found" });
    client.close();
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  }
};

//get category by name
const getCategoriesByName = async (req, res) => {
  const { name } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");

    const results = await db.collection("categories").findOne({ name });

    results
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: "Items not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//////////////////////////////////////////////////////////////////////////

module.exports = {
  getItems,
  getCompanies,
  getItemById,
  getItemByCategory,
  getItemByCompany,
  addItems,
  deleteItemFromCart,
  getCartItems,
  addUser,
  getUser,
  addCreditCards,
  getAllItems,
  getCategories,
  getCategoriesByName,
  getCompaniesById,
};
