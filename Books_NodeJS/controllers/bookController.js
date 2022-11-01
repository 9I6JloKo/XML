const e = require('express')
const Book = require('../models/books')

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
    if (!req.body.fullname || !req.body.id) {
        res.status(400).send({
            message: "name or id is not defined"
        })
        return
    }
    let authorChar = await Author.findOne({
        where: {author_id: req.body.id}
    })
    if(authorChar != null){
        const author = {
            fullName: req.body.fullname,
        }
        await Author.update(author,{
            where: {author_id: req.body.id}
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
exports.delete = async (req,res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    const id = {
        author_id: req.body.id
    }
    let authorChar = await Book.findOne({
        where: id
    })
    if(authorChar != null){
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