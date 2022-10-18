const {Sequelize} = require('sequelize');
const db = require('../connect/database')
const {DataTypes,Model} = require('sequelize');
const Category = require('./category');
const Author = require('./author');
class Book extends Model {}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            field: 'book_id'
        },
        title:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        isbn: {
            type: DataTypes.BIGINT,
            allowNull:true,
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull:true,
        },
        thumbnailUrl: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        shortDescription: {
            type: DataTypes.STRING(300),
            allowNull:true,
        },
        longDescription: {
            type: DataTypes.STRING(800),
            allowNull:true,
        },
        status: {
            type: DataTypes.ENUM('PUBLISHED', 'NOT PUBLISHED'),
            allowNull:false,
        },
        // authors: {
        //     type: DataTypes.INTEGER,
        //     allowNull:false,
        // },
        category: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        createdAt: {
            type:DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false
        },
        updatedAt: {
            type:DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false
        }
    },
    {
        sequelize:db,
        modelName: 'book',
    },
)

module.exports = Book