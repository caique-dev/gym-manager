const express = require('express')
const instructors = require('./instructors')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    res.render('instructors/index')
})

routes.get('/members', (req, res) => {
    res.send('members')
})

routes.get('/create', (req, res) => {
    res.render('instructors/create.njk')
})

routes.post('/instructors', instructors.post)

// error 404
routes.use((req, res) => {
    res.status(404).render("not-found");
});

module.exports = routes