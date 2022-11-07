// /**
//  *@swagger
//  *components: 
//  *  schemas:
//  *      Category:
//  *          type: object
//  *          required:
//  *              - name
//  *          properties:
//  *              id:
//  *                  type: integer
//  *                  description: the auto-generated id of the category.
//  *              name:
//  *                  type: string
//  *                  description: The name of category.
//  *          example:
//  *              name: RESTful API
//  */

module.exports = app => {
    const bookCategories = require("../controllers/categoryBookController")
    const router = require("express").Router()
    router.post("/", bookCategories.create)
    // /**
    //  * 
    //  * @swagger
    //  * /api/categories:
    //  *  get:
    //  *      summary: Retrieve a list of categories.
    //  *      description: Retrieve a list of categories.
    //  *      responses:
    //  *          200:
    //  *              description: A list of categories.
    //  *              content:
    //  *                  application/json:
    //  *                      schema:
    //  *                          type: object
    //  *                          properties:
    //  *                              data:
    //  *                                  type: array
    //  *                                  items:
    //  *                                      type: object
    //  *                                      properties:
    //  *                                          id:
    //  *                                              type: integer
    //  *                                              description: The category ID.
    //  *                                              example: 1
    //  *                                          name:
    //  *                                              type: string
    //  *                                              description: The category's name.
    //  *                                              example: RESTful API
    //  *                                  
    //  */
    router.get("/", bookCategories.findAll)
    router.delete("/", bookCategories.delete)
    router.put("/", bookCategories.change)
    app.use('/api/bookCategories', router)
}