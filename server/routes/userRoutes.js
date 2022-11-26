const express = require("express");
const router = express.Router();

const { search } = require("../controllers/userControllers");

router.post("/search", search);

module.exports = router;
