require("dotenv").config();

module.exports = {
    server: {
        port: process.env.PORT,
        address: process.env.ADDRESS
    },
    database: {
        mongodb: "mongodb+srv://non:non@cluster0.rp8ie.mongodb.net/",
        mysql: MysqlConfig,
    },
}



function MysqlConfig(){
    const { MYSQL_SSL, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
    if(MYSQL_SSL === "true"){
        return {
            host: MYSQL_HOST,                                     
            user: MYSQL_USER,     
            password: MYSQL_PASSWORD,                                     
            port: parseInt(MYSQL_PORT),                                             
            database: MYSQL_DATABASE,                                                          
            ssl: {
                rejectUnauthorized: true,
            }, 
        }
    }
    else{
        return {
            host: MYSQL_HOST,                                     
            user: MYSQL_USER,     
            password: MYSQL_PASSWORD,                                     
            port: parseInt(MYSQL_PORT),                                             
            database: MYSQL_DATABASE,                                           
        }
    }
}