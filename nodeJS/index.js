const express = require('express');
const connection = require('./database');
const app = express()
app.use(express.json())
// module.exports = connection

app.get('/categories', function(req, res) {
  connection.query('SELECT * FROM category', function (error, result) {
    if (error) console.error(error);
    return res.send({data: result});
  });
});

app.get('/actors/:id',(req,res) => {
  const id = req.params.id
  connection.query('SELECT * FROM actor WHERE actor_id = ?', id, (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/filmNames',(req,res) => {
  connection.query('SELECT title FROM film', (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/actors',(req,res) => {
  connection.query('SELECT * FROM actor ORDER BY first_name ASC LIMIT 10', (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/films/:name',(req,res) => {
  const name = req.params.name
  connection.query('SELECT title FROM film WHERE film_id IN '+
  '(SELECT film_id FROM film_category WHERE category_id IN (SELECT category_id FROM category WHERE name = ?))', name, (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/actors/films/:id',(req,res) => {
  const id = req.params.id
  connection.query('SELECT * FROM film WHERE film_id IN '+
  '(SELECT film_id FROM film_actor WHERE actor_id = ?)', id, (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/lastNameActors/films/:lastname',(req,res) => {
  const lastname = req.params.lastname
  connection.query('SELECT * FROM film WHERE film_id IN' +
  '(SELECT film_id FROM film_actor WHERE actor_id IN (SELECT actor_id FROM actor WHERE last_name = ?))', lastname, (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/lastNameActorsLetters/films/:id',(req,res) => {
  const id = req.params.id
  connection.query("SELECT * FROM film WHERE film_id IN" +
  "(SELECT film_id FROM film_actor WHERE actor_id IN (SELECT actor_id FROM actor WHERE last_name LIKE ? '%'))", id, (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.get('/filmCountGenre',(req,res) => {
  connection.query("SELECT COUNT(*) AS filmCount, (SELECT name FROM category WHERE category.category_id = film_category.category_id) AS genre"+
  " FROM film_category GROUP BY category_id", (error, result) => {
    if (error) console.error(error);
    return res.send({data:result})
  })
})

app.post('/actorInsert',(req,res) => {
  connection.query("INSERT INTO actor SET ?", req.body, (error, result) => {
    if (error) console.error(error);
    res.status(201).send(`Actor added with ID: ${result.insertId}`)
  })
})

app.put('/actorsPut/:id',(req,res) => {
  const idd = req.params.id
  connection.query("UPDATE actor SET ? WHERE actor_id = ?", [req.body, idd], (error) => {
    if (error) console.error(error);
    res.status(200).send(`Actor with ${idd} updated successfully.`)
  })
})

app.delete('/actorsDelete/:id',(req,res) => {
  const idd = req.params.id
  connection.query("DELETE FROM actor WHERE actor_id = ?", idd, (error) => {
    if (error) console.error(error);
    res.status(200).send(`Actor with ${idd} deleted successfully.`)
  })
})


app.listen(3000)