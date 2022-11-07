const e = require('express')
const BooksCategories = require('../models/bookscategories')

exports.create = (req,res) => {
    if (!req.body.categoryId || !req.body.bookId) {
        res.status(400).send({
            message: "idbook or category is not defined"
        })
        return
    }
    const booksCategories = {
        categoryId: req.body.categoryId,
        bookId: req.body.bookId,
    }
    BooksCategories.create(booksCategories)
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
    if (!req.body.categoryId || !req.body.bookId) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    let bookCategoryChar = await BooksCategories.findOne({
        where: {categoryId: req.body.categoryId, bookId: req.body.bookId}
    })
    if(bookCategoryChar != null){
        const bookCategory = {
            categoryId: req.body.categoryId,
            bookId: req.body.bookId,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        }
        await BooksCategories.update(bookCategory,{
            where: {categoryId: req.body.categoryId, bookId: req.body.bookId}
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
    BooksCategories.findAll()
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
    if (!req.body.categoryId || !req.body.bookId) {
        res.status(400).send({
            message: "id is not defined"
        })
        return
    }
    const id = {
        categoryId: req.body.categoryId, bookId: req.body.bookId
    }
    let BookCategoryChar = await BooksCategories.findOne({
        where: id
    })
    if(BookCategoryChar != null){
        await BooksCategories.destroy({
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