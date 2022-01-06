const express = require("express");

const router = express.Router();

const { getCompanies, getCompaniesById } = require("../handlers");

// gets all companies in database
router.get("/api/companies", getCompanies);
router.get("/api/companies/:_id", getCompaniesById);

module.exports = router;
