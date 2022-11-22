const db = require('./connect/database.js')
const {Sequelize,DataTypes,Model} = require('sequelize')
let Author = require('./models/author.js')
const { sequelize } = require('./models/books.js')
let Books = require('./models/books.js')
const dbAdd = require('./dbAdd')
var data = require('./jsonParse/toParse.json'); 
let Categories = require('./models/category.js')
let BooksAuthors = require('./models/authorsbooks.js')
let BooksCategories = require('./models/bookscategories.js')

Books.belongsToMany(Categories, {through: 'booksCategories'})
Categories.belongsToMany(Books, {through: 'booksCategories'})
Author.belongsToMany(Books, {through: 'authorsBooks'})
Books.belongsToMany(Author, {through: 'authorsBooks'})

async function dataCreate(){
    await db.sync({force:true}); // force - создать или перезаписать базу с нуля
    await dbAdd(data);

    const express = require("express")
    const cors = require("cors")
    const app = express()

    app.use(cors())

    app.use(express.json())

    app.use(express.urlencoded({ extended: true}))

    app.get("/", (req,res) => {
        res.json({ message: "Welcome to library Restful API"})
    })

    require("./routes/categoryRoutes")(app)
    require("./routes/authorRoutes")(app)
    require("./routes/bookRoutes")(app)
    require("./routes/authorBookRoutes")(app)
    require("./routes/bookCategoryRoutes")(app)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`------------------------------------------------Server is running on port ${PORT}.`)
    })

}
dataCreate();