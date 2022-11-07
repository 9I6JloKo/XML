const e = require('express')
const {seq} = require('sequelize')
const Book = require('../models/books')
const AuthorBooks = require('../models/authorsbooks')

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
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving authors"
            })
        })
    }else{
        
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
        where: {[seq.like]:{title: '%'+req.body.title+'%'}}
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
 exports.findByAuthor = async (req,res) => {
    if (!req.body.authorId) {
        res.status(400).send({
            message: "authorId is not defined"
        })
        return
    }
    let bookAuthorId = await AuthorBooks.findAll({
        where: {authorId: req.body.authorId},
        raw: true
    })
    if(bookAuthorId != null){
        Book.findAll({
            where: {
                id: bookAuthorId.bookId
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
    }else{
        res.status(500).send({
            message:
                "author is false"
        })
    }
}