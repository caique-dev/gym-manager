const instructor = require('../models/instructors')
const { age, date } = require('../../lib/utilitarios')

module.exports = {
    list(req, res) {
        instructor.all( instructors => {
            for (instructor_item of instructors) {
                instructor_item.services = instructor_item.services.split(',')
            }

            return res.render(`instructors/index`, { instructors })
        })
    },
    create(req, res) {
        const instructor = { gender: 'F'}
        return res.render('instructors/create', { instructor })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
        }

        instructor.create(req.body, instructor => {
            return res.redirect(`/instructors/${ instructor.id }`)
        })
    },
    show(req, res) {
        instructor.find(req.params.id, instructor => {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format

            return res.render('instructors/show', { instructor })
        })
    },
    edit(req, res) {
        instructor.find(req.params.id, instructor => {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.birth = date(instructor.birth).ISO

            return res.render('instructors/edit', { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
        }

        instructor.update(req.body, () => res.redirect(`/instructors/${ req.body.id }`))
    },
    delete(req, res) {
        instructor.delete(req.body.id, () => {
            res.redirect('/instructors')
        })
    }
}