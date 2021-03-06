const express = require('express')
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.list)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

routes.get('/members', members.list)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post('/members', members.post)
routes.put('/members', members.put)
routes.delete('/members', members.delete)

// error 404
routes.use((req, res) => {
    return res.status(404).render("not-found");
});

module.exports = routes