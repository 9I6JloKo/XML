const e = require('express')
const Author = require('../models/author')

exports.create = (req,res) => {
    if (!req.body.fullname) {
        res.status(400).send({
            message: "fullname is not defined"
        })
        return
    }
    const author = {
        fullname: req.body.fullname,
    }
    Author.create(author)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Author"
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
    Author.findAll()
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
    let authorChar = await Author.findOne({
        where: id
    })
    if(authorChar != null){
        await Author.destroy({
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