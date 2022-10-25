const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../connect/database')
const sequelize = require('../connect/database.js')
class authorsbooks extends Model {}
authorsbooks.init( {
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'authors',
          key: 'author_id'
        }
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'books',
          key: 'book_id'
        }
      }
    }, {
      sequelize,
      tableName: 'authorsbooks',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "authorId" },
            { name: "bookId" },
          ]
        },
        {
          name: "bookId",
          using: "BTREE",
          fields: [
            { name: "bookId" },
          ]
        },
      ]
    });
module.exports = authorsbooks