const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { executeQuery } = require("../../database/connection.js");
const config = require("../../config/config.js");

router.get("/", async(req, res) =>{
    return res.redirect(config.mainWebUrl);
});

module.exports = router;