const e = require('express')
const Category = require('../models/category')

exports.create = (req,res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "name is not defined"
        })
        return
    }
    const category = {
        categoryName: req.body.name,
    }
    Category.create(category)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Category"
        })
    })
}
exports.findAll = (req,res) => {
    Category.findAll()
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
exports.change = async (req,res) => {
    if (!req.body.name || !req.body.id) {
        res.status(400).send({
            message: "name or id is not defined"
        })
        return
    }
    let categoryChar = await Category.findOne({
        where: {category_id: req.body.id}
    })
    if(categoryChar != null){
        const category = {
            categoryName: req.body.name,
        }
        await Category.update(category,{
            where: {category_id: req.body.id}
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
        category_id: req.body.id
    }
    let categoryChar = await Category.findOne({
        where: id
    })
    if(categoryChar != null){
        await Category.destroy({
            where: id
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
    }else{}
}