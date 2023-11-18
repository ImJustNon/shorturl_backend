const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { executeQuery } = require("../../database/connection.js");
const config = require("../../config/config.js");
const { generate } = require("../../utilities/unique_id.js");

router.post("/api/create/short-url", urlEncoded, async(req, res) =>{
    const { url, userToken } = req.body ?? {};

    const checkUrlCache = await executeQuery("SELECT * FROM shorturl_data WHERE original_url=? AND create_by=?", [String(url), String(userToken)]);
    if(checkUrlCache.results.length !== 0){
        return res.json({
            status: "SUCCESS",
            error: null,
            data: {
                short_url: `${config.server.address}/s/${checkUrlCache.results[0].url_id}`,
                url_id: checkUrlCache.results[0].url_id,
                original_url: checkUrlCache.results[0].original_url,
                create_at: checkUrlCache.results[0].create_at,
                create_by: checkUrlCache.results[0].create_by,
            }
        });
    }

    const url_id = await generate(7);
    const create_at = new Date().getTime();
    await executeQuery("INSERT INTO shorturl_data(url_id,short_url,use_count,last_use,original_url,create_at,create_by) VALUES(?,?,?,?,?,?,?)", [String(url_id), String(`${config.server.address}/s/${url_id}`), String("0"), String("0"), String(url), String(create_at), String(userToken)])
    return res.json({
        status: "SUCCESS",
        error: null,
        data: {
            short_url: `${config.server.address}/s/${url_id}`,
            url_id: url_id,
            original_url: url,
            create_at: String(create_at),
            create_by: userToken,
        }
    });
});

module.exports = router;