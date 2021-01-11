const { age, date } = require('../../lib/utilitarios')

module.exports = {
    create(req, res) {
        const member = { gender: 'F'}
        return res.render('members/create.njk', { member })
    },
    list(req, res) {
        const members = []

        for (let index = 0; index < data.members.length; index++) {
            if (data.members[index].services) {
                members[index] = {
                    ...data.members[index],
                    services: data.members[index].services.split(',')
                }
            }
        }

        return res.render('members/index',)
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
        }
        
        return res.send('refatorando')
    },
    show(req, res) {
        const { id } = req.params

        const foundMember = data.members.find(member.id == id)

        if (!foundMember) return res.send('Instrutor não encontrado')

        const member = {
            ...foundMember,
            age: age(foundMember.birth),
            services: foundMember.services.split(','),
            created_at: date(foundMember.created_at).desde
        }

        return res.render('members/show', { member })
    },
    edit(req, res) {
        const { id } = req.params

        const foundMember = data.members.find(member.id == id)

        if (!foundMember) return res.send('Instrutor não encontrado')

        const member = {
            ...foundMember,
            birth: date(foundMember.birth).ISO
        }

        return res.render('members/edit', { member })
    },
    put(req, res) {
        const  { id } = req.body
        let index 

        const foundMember = data.members.find( ( member, foundIndex ) => {
            if (member.id == id) {
                index = foundIndex
                return true
            }
        })

        if (!foundMember) return res.send('Instrutor(a) não encontrado!')   
    },
    delete(req, res) {
        const { id } = req.body

        const filteredMembers = data.members.filter( member.id != id )

        data.members = filteredMembers

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
            if (error) return res.send('Erro na gravação do arquivo')

            return res.redirect('/')
        })
    }
}