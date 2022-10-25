const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../connect/database')
const Books = require('./books')
const sequelize = require('../connect/database.js')
class bookscategories extends Model {}
bookscategories.init( {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'books',
          key: 'book_id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'category_id'
        }
      }
    }, {
      sequelize,
      tableName: 'bookscategories',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "bookId" },
            { name: "categoryId" },
          ]
        },
        {
          name: "categoryId",
          using: "BTREE",
          fields: [
            { name: "categoryId" },
          ]
        },
      ]
    });
module.exports = bookscategories