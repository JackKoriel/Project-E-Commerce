const express = require("express");

const router = express.Router();

const {
  getItems,
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
} = require("../handlers");

/////////////////////////////////////////////////////////////////////////////

// all items from server
router.get("/api/allItems", getAllItems);

// gets a range of items from server
router.get("/api/items", getItems);

// gets a single item by id# from server
router.get("/api/items/:_id", getItemById);

// gets items by category from server
router.get("/api/category", getItemByCategory);

// gets items by companyId from server
router.get("/api/products/:_id", getItemByCompany);

// adds items to cart in the server
// removes item from stock
router.post("/api/cart", addItems);

// removes an item from cart
// adds back to stock
router.delete("/api/cart/:_id", deleteItemFromCart);

// gets all items that are in your cart from server
router.get("/api/cart", getCartItems);

// add new users to db after signup process is successfull
router.post("/api/signup", addUser);

//get user at login
router.post("/api/signin", getUser);

//get all categories
router.get("/api/categories", getCategories);

//get category by Id
router.get("/api/categories/:name", getCategoriesByName);

//post credit card
router.post("/api/purchase", addCreditCards);
module.exports = router;
/////////////////////////////////////////////////////////////////////////////
