const { EIDRM } = require('constants')
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utilitarios')

// cadastro
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") return res.send(`O campo "${key}" está vazio. Por favor, preencha todos os campos.`)
    }

    
    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length + 1)

    const { id, avatar_url, name, birth, gender, services, created_at } = req.body
    
    data.instructors.push({
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
        return res.redirect('/instructors')
    })
}

// exibição
exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        avatar_url: 'https://source.unsplash.com/collection/3621148/900x900', // só para não deixar os cadastros sem foto 
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: date(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor })
}

// edição
exports.edit = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth, true)
    }

    return res.render('instructors/edit', { instructor })
}