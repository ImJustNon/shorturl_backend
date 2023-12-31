const { executeQuery } = require("../database/connection.js");

module.exports = {
    generate: (length) =>{
        return new Promise(async(resolve, reject) =>{
            for(let x = 0; x < Infinity; x++){
                let charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
                let password = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    password += charset.charAt(Math.floor(Math.random() * n));
                }

                // เข็ค
                const check = await executeQuery("SELECT * FROM shorturl_cache WHERE url_id=?", [String(password)]);
                if(await check.results.length === 0){
                    resolve(password);
                    break;
                }
                // const check = await query({
                //     sql: `SELECT * FROM short_url WHERE unique_id='${password}'`,
                // })

                // if(await check.result.rows.length === 0) {
                //     resolve(password);
                //     break;
                // }
            }
        });
    }
}