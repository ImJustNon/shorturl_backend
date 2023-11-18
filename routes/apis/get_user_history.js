const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { executeQuery } = require("../../database/connection.js");
const config = require("../../config/config.js");

router.post("/api/get/user-history", urlEncoded, async(req, res) =>{
    const { userToken } = req.body ?? {};
    if(!userToken){
        return res.json({
            status: "FAIL",
            error: "Cant find userToken from your request"
        });
    }

    const getInformation = await executeQuery("SELECT * FROM shorturl_data WHERE create_by=?", [String(userToken)]);
    return res.json({
        status: "SUCCESS",
        error: null,
        data: {
            results: getInformation.results,
        }
    });
});

module.exports = router;