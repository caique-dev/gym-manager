const member = require('../models/members')
const { age, date } = require('../../lib/utilitarios')

module.exports = {
    list(req, res) {
        member.all( members => {
            for (member_item of members) {
                member_item.services = member_item.services.split(',')
            }

            return res.render(`members/index`, { members })
        })
    },
    create(req, res) {
        const member = { gender: 'F'}
        return res.render('members/create.njk', { member })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
        }

        member.create(req.body, member => {
            return res.redirect(`/members/${ member.id }`)
        })
    },
    show(req, res) {
        member.find(req.params.id, member => {
            if (!member) return res.send("Instrutor não encontrado!")

            member.age = age(member.birth)
            member.services = member.services.split(',')
            member.created_at = date(member.created_at).format

            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        member.find(req.params.id, member => {
            if (!member) return res.send("Instrutor não encontrado!")

            member.birth = date(member.birth).ISO

            return res.render('members/edit', { member })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
        }

        member.update(req.body, () => res.redirect(`/members/${ req.body.id }`))
    },
    delete(req, res) {
        member.delete(req.body.id, () => {
            res.redirect('/members')
        })
    }
}