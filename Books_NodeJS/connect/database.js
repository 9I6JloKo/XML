const {Sequelize} = require('sequelize');
const connection = new Sequelize('booksjptv20','root','',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = connection