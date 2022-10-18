const {Sequelize, DataTypes} = require('sequelize');
const db = require('../database')

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        field: 'category_id',
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull:false
    },
},{
    timestamps:false,
})
module.exports = Category