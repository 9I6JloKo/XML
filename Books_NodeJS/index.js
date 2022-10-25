const db = require('./connect/database.js')
const {Sequelize,DataTypes,Model} = require('sequelize')
let Author = require('./models/author.js')
const { sequelize } = require('./models/books.js')
let Books = require('./models/books.js')
let Categories = require('./models/category.js')
let BooksAuthors = require('./models/authorsbooks.js')
let BooksCategories = require('./models/bookscategories.js')


// Books.belongsToMany(Categories, {through: 'booksCategories'})
// Categories.belongsToMany(Books, {through: 'booksCategories'})
// Author.belongsToMany(Books, {through: 'authorsBooks'})
// Books.belongsToMany(Author, {through: 'authorsBooks'})

db.sync({force:true}) // force - создать или перезаписать базу с нуля

// Author.create({
//     firstname: "Tom",
//     lastname: "Cruise"
// }).then(res => {
//     console.log(res);
// }).catch(err => console.log(err));

// Author.update({lastname: "Petrova"}, {
//     where: {
//         id: 1
//     }
// }).then((res) => {
//     console.log(res)
// });

// Author.destroy({
//     where: {
//         id:1
//     }
// }).then((res) => {
//     console.log(res);
// })

