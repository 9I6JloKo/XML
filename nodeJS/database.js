const connection = require(".");

module.exports = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
};

connection.query(
    'SELECT * FROM category',
    function(err, results) {
        console.log(results);
    }
)