const member = require('../models/members')
const { age, blood_type, date } = require('../../lib/utilitarios')

module.exports = {
    list(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset,
            callback(foundMembers) {

                const pagination = {
                    total: Math.ceil(foundMembers[0].total / limit),
                    page
                }

                res.render('members/index', { members: foundMembers, filter, pagination })
            }
        }

        member.paginate(params)
    },
    create(req, res) {
        member.instructorsOptions( instructorsOptions => {
            const member = { create: true, gender: 'F' }
            return res.render('members/create', { member, options: instructorsOptions })
        })
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
            member.birth = date(member.birth).birth
            member.blood_type = blood_type(member.blood_type)

            // console.log(member)

            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        member.find(req.params.id, foundMember => {
            if (!foundMember) return res.send("Instrutor não encontrado!")

            foundMember.birth = date(foundMember.birth).ISO

            // console.log(member)

            member.instructorsOptions( instructorsOptions => {
                return res.render('members/edit', { member: foundMember, options: instructorsOptions })
            })
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