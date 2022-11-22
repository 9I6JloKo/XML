const e = require('express')
const Sequelize = require('sequelize')
const seq = Sequelize.Op;
const Book = require('../models/books')
const AuthorBooks = require('../models/authorsbooks');
const { Model } = require('sequelize');
const Author = require('../models/author');
const Category = require('../models/category');
const CategoryBooks= require('../models/bookscategories');

exports.create = (req,res) => {
    if (!req.body.title || !req.body.pageCount || !req.body.status  || !req.body.categories || !req.body.authors) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    const book = {
        title: req.body.title,
        pageCount: req.body.pageCount,
        isbn: req.body.isbn,
        status: req.body.status,
        longDescription: req.body.longDescription,
        shortDescription: req.body.shortDescription,
        thumbnailUrl: req.body.thumbnailUrl,
        publishedDate: req.body.publishedDate,
    }
    Book.create(book)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating book"
        })
    })
}
exports.change = async (req,res) => {
    if (!req.body.id && !req.body.title && !req.body.pageCount && !req.body.status) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    let bookChar = await Book.findOne({
        where: {book_id: req.body.id}
    })
    if(bookChar != null){
        const book = {
            title: req.body.title,
            pageCount: req.body.pageCount,
            isbn: req.body.isbn,
            status: req.body.status,
            longDescription: req.body.longDescription,
            shortDescription: req.body.shortDescription,
            thumbnailUrl: req.body.thumbnailUrl,
            publishedDate: req.body.publishedDate,
        }
        await Book.update(book,{
            where: {book_id: req.body.id}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving categories"
            })
        })
    }
}
exports.delete = async (req,res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    const id = {
        book_id: req.params.id
    }
    let bookChar = await Book.findOne({
        where: id
    })
    if(bookChar != null){
        await Book.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `Book ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving authors"
            })
        })
    }else{
        res.status(200).send({
            message: `Book ${req.params.id} cannot be deleted!`
        })
    }
}
// МЕТОДЫ 2 части задания
exports.findAll = (req,res) => {
    Book.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving authors"
        })
    })
}
exports.findByTitle = (req,res) => {
    if (!req.params.title) {
        res.status(400).send({
            message: "title is not defined"
        })
        return
    }
    Book.findAll({
        where: {
            title: { [seq.like]: `%${req.params.title}%`}
        }})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving authors"
        })
    })
}
 exports.findByAuthor = async (req,res) => {
    if (!req.params.author) {
        res.status(400).send({
            message: "author is not defined"
        })
        return
    }
    Book.findAll({
        include:[
            {
                model: Author,
                where: {
                    fullname: {[seq.like]: `%${req.params.author}%`}
                }
            }
        ]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving authors"
        })
    })
}
exports.findByCategory = async (req,res) => {
    if (!req.params.category) {
        res.status(400).send({
            message: "category is not defined"
        })
        return
    }
    Book.findAll({
        include:[
            {
                model: Category,
                where: {
                    categoryName: {[seq.like]: `%${req.params.category}%`}
                }
            }
        ]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving authors"
        })
    })
}
exports.showCategoriesBooks = async (req,res) => {
    await CategoryBooks.findAll({
        attributes: {
            include:[[Sequelize.fn('COUNT', Sequelize.col("bookId")), 'TotalBooks']]
        },
        group: ['categoryId'],
    })
    .then(data => {
        let categories = null;
        let jsonstring2 = JSON.stringify(data)
        answer = JSON.parse(jsonstring2)
        Category.findAll({
            attributes:["category_id", "categoryName"],
            order: ["category_id"]
        })
        .then(data => {
            let jsonstring = JSON.stringify(data);
            categories = JSON.parse(jsonstring);
            for (let i = 0; i < answer.length; i++) {
                answer[i].categoryName = categories[i].categoryName;
                delete answer[i].bookId;
                delete answer[i].createdAt;
                delete answer[i].updatedAt;
            }
            res.send(answer)
        }
        )
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving authors"
        })
    })
    // let answer = null;
    // await Category.findAll({
    //     attributes: ['category_id', 'categoryName'],
    // })
    // .then(data => {
    //     let jsonFormat = JSON.stringify(data);
    //     answer = JSON.parse(jsonFormat);
    // })
    // for (let i = 0; i < answer.length; i++) {
    //     await CategoryBooks.count({
    //         where:{categoryId:answer[i].category_id}
    //     })
    //     .then(data => {
    //         // delete answer[i].category_id;
    //         answer[i].totalBooks = data;
    //     })
    // }
    // res.send(answer);
}