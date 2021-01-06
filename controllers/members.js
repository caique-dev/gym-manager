// const { EIDRM } = require('constants')
const fs = require('fs')
const data = require('../data.json')
const { age, date, blood_type } = require('../utilitarios')

// leva para a page de criacao
exports.create = (req, res) => {
    const member = { gender: 'F'}
    return res.render('members/create.njk', { member })
}

// listagem
exports.list = (req, res) => {
    const members = []

    for (let index = 0; index < data.members.length; index++) {
        if (data.members[index].services) {
            members[index] = {
                ...data.members[index],
                services: data.members[index].services.split(',')
            }
        }
    }

    return res.render('members/index', { members: data.members })
}

// cadastro
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
    }

    console.log('req.body: ', req.body)
    
    let birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length - 1]
    console.log('lastMember: ', lastMember)
    
    if (lastMember) id = lastMember.id + 1
    
    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), error => {
        if (error) res.send('Deu erro na escrita do arquivo!!')
        return res.redirect(`/members/${id}`)
    })
}

// exibição
exports.show = (req, res) => {
    const { id } = req.params

    const foundMember = data.members.find(member => member.id == id)

    if (!foundMember) return res.send('Instrutor não encontrado')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birth,
        blood_type: blood_type(foundMember.blood_type),
        age: age(foundMember.birth)
    }

    return res.render('members/show', { member })
}

// edição - apenas mostra os dados para editar
exports.edit = (req, res) => {
    const { id } = req.params

    const foundMember = data.members.find(member => member.id == id)

    if (!foundMember) return res.send('Instrutor não encontrado')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).ISO
    }

    return res.render('members/edit', { member })
}

// atualização do casdatro no data
exports.put = (req, res) => {
    const  { id } = req.body
    let index 

    const foundMember = data.members.find( ( member, foundIndex ) => {
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Instrutor(a) não encontrado!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: +foundMember.id
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
        if (error) return res.send('Erro na escrita do arquivo')

        return res.redirect(`/members/${id}`)
    })        
}

// remoção do perfil
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredMembers = data.members.filter( member => member.id != id )

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
        if (error) return res.send('Erro na gravação do arquivo')

        return res.redirect('/')
    })
}
