const { age, date } = require('../../lib/utilitarios')
const db = require('../../config/db')

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

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6 )
            RETURNING id, name
        `
        
        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).ISO,
            date(Date.now()).ISO
        ]

        db.query(query, values, (error, results) => {
            if (error) return res.send('DATABASE error!')

            return res.redirect(`/instructors/${ results.rows[0].id }`)
        })
    },
    show(req, res) {
        const { id } = req.params

        return res.render('instructors/show')
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