const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { executeQuery } = require("../../database/connection.js");
const config = require("../../config/config.js");

router.get("/s/:url_id", async(req, res) =>{
    const { url_id } = req.params ?? {};
    if(!url_id){
        return res.json({
            status: "FAIL",
            error: "Cant find information from this id",
        });
    }

    const checkAvailable = await executeQuery("SELECT * FROM shorturl_data WHERE url_id=?", [String(url_id)]);
    if(checkAvailable.results.length === 0){
        return res.json({
            status: "FAIL",
            error: "Cant find information from this id",
        });
    }

    // if pass and then update status
    const currentTime = new Date().getTime();
    await executeQuery("UPDATE shorturl_data SET use_count=? , last_use=? WHERE url_id=?", [String(parseInt(checkAvailable.results[0].use_count) + 1), String(currentTime), String(url_id)]);
    return res.redirect(checkAvailable.results[0].original_url);
});

module.exports = router;