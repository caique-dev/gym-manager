const fs = require('fs')
const data = require('./data.json')

// verifica dados do formulario de cadastro e criando novo registro
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