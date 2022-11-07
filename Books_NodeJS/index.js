const db = require('./connect/database.js')
const {Sequelize,DataTypes,Model} = require('sequelize')
let Author = require('./models/author.js')
const { sequelize } = require('./models/books.js')
let Books = require('./models/books.js')
let Categories = require('./models/category.js')
let BooksAuthors = require('./models/authorsbooks.js')
let BooksCategories = require('./models/bookscategories.js')

const express = require("express")
const cors = require("cors")

const app = express()

// const swaggerJsdoc = require("swagger-jsdoc")
// const swaggerUi = require("swagger-ui-express")


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

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Library Example",
//             version: "0.1.0",
//             description:
//                 "This is a simple CRUD API"
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000/",
//                 description: 'Development server',
//             },
//         ],
//     },
//     apis: ["./routes/*"],
// };
// const specs = swaggerJsdoc(options);
// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// );

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})



// Books.belongsToMany(Categories, {through: 'booksCategories'})
// Categories.belongsToMany(Books, {through: 'booksCategories'})
// Author.belongsToMany(Books, {through: 'authorsBooks'})
// Books.belongsToMany(Author, {through: 'authorsBooks'})

// db.sync({force:true}) // force - создать или перезаписать базу с нуля

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

