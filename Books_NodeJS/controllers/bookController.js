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
    if (!req.body.title || !req.body.pageCount || !req.body.status) {
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
    if (!req.body.id) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    const id = {
        book_id: req.body.id
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
                message: `Book ${req.body.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving authors"
            })
        })
    }else{
        res.status(200).send({
            message: `Book ${req.body.id} cannot be deleted!`
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
    if (!req.body.title) {
        res.status(400).send({
            message: "title is not defined"
        })
        return
    }
    Book.findAll({
        where: {
            title: { [seq.like]: `%${req.body.title}%`}
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
    if (!req.body.authorId) {
        res.status(400).send({
            message: "authorId is not defined"
        })
        return
    }
    Book.findAll({
        include:[
            {
                model: Author,
                where: {
                    author_id: req.body.authorId
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
    if (!req.body.categoryId) {
        res.status(400).send({
            message: "categoryId is not defined"
        })
        return
    }
    Book.findAll({
        include:[
            {
                model: Category,
                where: {
                    category_id: req.body.categoryId
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
    // CategoryBooks.findAll({
    //     attributes: {
    //         include:[[Sequelize.fn('COUNT', Sequelize.col("bookId")), 'categoryBooks']]
    //     },
    //     group: ['categoryId'],
    // })
    // .then(data => {
    //     res.send(data)
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message:
    //             err.message || "Some error occured while retrieving authors"
    //     })
    // })
    let answer = null;
    await Category.findAll({
        attributes: ['category_id', 'categoryName'],
    })
    .then(data => {
        let jsonFormat = JSON.stringify(data);
        answer = JSON.parse(jsonFormat);
    })
    for (let i = 0; i < answer.length; i++) {
        await CategoryBooks.count({
            where:{categoryId:answer[i].category_id}
        })
        .then(data => {
            // delete answer[i].category_id;
            answer[i].totalBooks = data;
        })
    }
    res.send(answer);
}