const express = require("express");
const { getVerbConjugation } = require("../controllers/verbController");
const router = express();

router.route("/:verb").get(getVerbConjugation);

module.exports = router;
