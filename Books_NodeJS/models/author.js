const {Sequelize, DataTypes} = require('sequelize');
const db = require('../database')
const Books = require('./books')
const Author = db.define('author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull:false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull:false
    },
},{
    timestamps:false,
})
module.exports = Author