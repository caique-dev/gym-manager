// const { EIDRM } = require('constants')
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utilitarios')

// listagem
exports.list = (req, res) => {
    // let instructors = [...data.instructors]

    // instructors = instructors.map( instructor => instructor.services.split(','))

    // console.log(instructors[0])

    return res.render('instructors/index', { instructors: data.instructors })
}

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
        return res.redirect(`/instructors/${id}`)
    })
}

// exibição
exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: date(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor })
}

// edição - apenas mostra os dados para editar
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

// atualização do casdatro no data
exports.put = (req, res) => {
    const  { id } = req.body
    let index 

    const foundInstructor = data.instructors.find( ( instructor, foundIndex ) => {
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instrutor(a) não encontrado!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: +foundInstructor.id
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
        if (error) return res.send('Erro na escrita do arquivo')

        return res.redirect(`/instructors/${id}`)
    })        
}

// remoção do perfil
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter( instructor => instructor.id != id )

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
        if (error) return res.send('Erro na gravação do arquivo')

        return res.redirect('/')
    })
}
