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
    const books = require("../controllers/bookController")
    const router = require("express").Router()
    router.post("/", books.create)
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
    router.get("/", books.findAll)

    router.delete("/", books.delete)
    router.put("/", books.change)
    router.get("/findByTitle", books.findByTitle)
    router.get("/findByAuthor", books.findByAuthor)
    router.get("/findByCategory", books.findByCategory)
    router.get("/showCategoriesBooks", books.showCategoriesBooks)
    app.use('/api/books', router)
}