const express = require("express");

const router = express.Router();

const {
  getSummary,
} = require("../controllers/aiController");

router.post(
  "/summary",
  getSummary
);

module.exports = router;