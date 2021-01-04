// const { EIDRM } = require('constants')
const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utilitarios')

// leva para a page de criacao
exports.create = (req, res) => {
    const instructor = { gender: 'F'}
    return res.render('members/create.njk', { member })
}

// listagem
exports.list = (req, res) => {
    // let members = [...data.members]

    // for (let member of data.members) {
    //     member.services = member.services.split(',')
    // } está dando erros aleatórios

    return res.render('members/index', { members: data.members })
}

// cadastro
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
    }

    
    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.members.length + 1)

    const { id, avatar_url, name, birth, gender, services, created_at } = req.body
    
    data.members.push({
        id,
        name,
        gender,
        birth,
        services,
        avatar_url,
        created_at
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
        birth: date(foundMember.birth, true)
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
