const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { executeQuery } = require("../../database/connection.js");
const config = require("../../config/config.js");

router.post("/api/delete/user-history", urlEncoded, async(req, res) =>{
    const { userToken, url_id } = req.body ?? {};

    if(!userToken || !url_id){
        return res.json({
            status: "FAIL",
            error: "require information missing",
        });
    }

    const checkMatch = await executeQuery("SELECT * FROM shorturl_data WHERE url_id=? AND create_by=?", [String(url_id), String(userToken)]);
    if(checkMatch.results.length === 0){
        return res.json({
            status: "FAIL",
            error: "Cant find information"
        });
    }

    // delete data
    await executeQuery("DELETE FROM shorturl_data WHERE url_id=? AND create_by=?", [String(url_id), String(userToken)]);
    return res.json({
        status: "SUCCESS",
        error: null
    });
});

module.exports = router;