const e = require('express')
const AuthorBooks = require('../models/authorsbooks')

exports.create = (req,res) => {
    if (!req.body.authorId || !req.body.bookId) {
        res.status(400).send({
            message: "idbook or author is not defined"
        })
        return
    }
    const authorBooks = {
        authorId: req.body.authorId,
        bookId: req.body.bookId,
    }
    AuthorBooks.create(authorBooks)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating authorBook"
        })
    })
}
exports.change = async (req,res) => {
    if (!req.body.authorId || !req.body.bookId) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    let authorBookChar = await AuthorBooks.findOne({
        where: {authorId: req.body.authorId, bookId: req.body.bookId}
    })
    if(authorBookChar != null){
        const authorBook = {
            authorId: req.body.authorId,
            bookId: req.body.bookId,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        }
        await AuthorBooks.update(authorBook,{
            where: {authorId: req.body.authorId, bookId: req.body.bookId}
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
exports.findAll = (req,res) => {
    AuthorBooks.findAll()
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
exports.delete = async (req,res) => {
    if (!req.body.authorId || !req.body.bookId) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    const id = {
        authorId: req.body.authorId, bookId: req.body.bookId
    }
    let authorBookChar = await AuthorBooks.findOne({
        where: id
    })
    if(authorBookChar != null){
        await AuthorBooks.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `Book author ${req.body.authorId} and ${req.body.bookId} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving authors"
            })
        })
    }else{
        res.status(200).send({
            message: `Book author ${req.body.authorId} and ${req.body.bookId} cannot be deleted!`
        })
    }
}