const express = require("express");
const app = express();

require("dotenv").config();
const config = require("./config/config.js");

const http = require("http");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const server = http.createServer(app); 
const urlEncoded = bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
});
const jsonEncoded = express.json({
    limit: '50mb',
});
const logger = morgan("dev");



app.use(cors());
app.use(logger);
app.use(jsonEncoded);
app.use(urlEncoded);


// routes loader
fs.readdirSync(path.join(__dirname, "./routes")).forEach(async folder => {
    fs.readdirSync(path.join(__dirname, `./routes/${folder}`)).forEach(async file =>{
        try {
            let router = require(`./routes/${folder}/${file}`);
            app.use(router);
            console.log(('[Route] ') + (`Loaded : ${folder}/${file}`));
        }
        catch (e){
            console.log(('[Route] ') + (`Fail to Load : ${folder}/${file} : `) + (e));
        }
    });
});

require("./database/connection.js").connect();
startListenPort();

function startListenPort(){
    server.listen(config.server.port);
}
server.on("listening", async() =>{
    console.log(("> ") + (`Localhost : ${config.server.address}:${config.server.port}`));
    console.log(("> ") + (`Listening on port : `) + (config.server.port));
});
server.on("error", (err) =>{
    console.log("[APP-ERROR] " + err);
});