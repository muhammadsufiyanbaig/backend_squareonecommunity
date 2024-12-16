require("dotenv").config();
const { neon } =  require("@neondatabase/serverless");
const sql = neon(process.env.Database_string);


module.exports = { sql };
