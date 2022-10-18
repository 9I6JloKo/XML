const db = require('./database.js')
const {DataTypes,Model} = require('sequelize')
let Author = require('./models/author.js')
const { sequelize } = require('./models/books.js')
let Books = require('./models/books.js')
let Categories = require('./models/category.js')
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

const A = sequelize.define('author', {name: DataTypes.STRING})
let B = sequelize.define('book', {name: DataTypes.STRING})
let C = sequelize.define('category', {name: DataTypes.STRING})
B.belongsToMany(C, {through: 'booksCategories'})
C.belongsToMany(B, {through: 'booksCategories'})
A.belongsToMany(B, {through: 'authorsBooks'})
B.belongsToMany(A, {through: 'authorsBooks'})
db.sync({force:true}) // force - создать или перезаписать базу с нуля