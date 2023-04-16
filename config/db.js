const Pool = require('pg').Pool
const connection = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'Reflection',
    password : 'cukis12345',
    port : 5432,
})

module.exports = connection;