const { age, date } = require('../../lib/utilitarios')

module.exports = {
    create(req, res) {
        const instructor = { gender: 'F'}
        return res.render('instructors/create.njk', { instructor })
    },
    list(req, res) {
        const instructors = []

        for (let index = 0; index < data.instructors.length; index++) {
            if (data.instructors[index].services) {
                instructors[index] = {
                    ...data.instructors[index],
                    services: data.instructors[index].services.split(',')
                }
            }
        }

        return res.render('instructors/index', { instructors })
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

        const foundInstructor = data.instructors.find(instructor.id == id)

        if (!foundInstructor) return res.send('Instrutor não encontrado')

        const instructor = {
            ...foundInstructor,
            age: age(foundInstructor.birth),
            services: foundInstructor.services.split(','),
            created_at: date(foundInstructor.created_at).desde
        }

        return res.render('instructors/show', { instructor })
    },
    edit(req, res) {
        const { id } = req.params

        const foundInstructor = data.instructors.find(instructor.id == id)

        if (!foundInstructor) return res.send('Instrutor não encontrado')

        const instructor = {
            ...foundInstructor,
            birth: date(foundInstructor.birth).ISO
        }

        return res.render('instructors/edit', { instructor })
    },
    put(req, res) {
        const  { id } = req.body
        let index 

        const foundInstructor = data.instructors.find( ( instructor, foundIndex ) => {
            if (instructor.id == id) {
                index = foundIndex
                return true
            }
        })

        if (!foundInstructor) return res.send('Instrutor(a) não encontrado!')   
    },
    delete(req, res) {
        const { id } = req.body

        const filteredInstructors = data.instructors.filter( instructor.id != id )

        data.instructors = filteredInstructors

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
            if (error) return res.send('Erro na gravação do arquivo')

            return res.redirect('/')
        })
    }
}