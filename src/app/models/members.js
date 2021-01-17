const db = require('../../config/db')
const { date } = require('../../lib/utilitarios')

module.exports = {
    all(callback) {
        db.query(`
            SELECT * 
            FROM members
            ORDER BY name ASC
            `, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood_type,
                height,
                weight,
                id_instructor
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )
            RETURNING id
        `
        
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).ISO,
            data.blood_type,
            data.height,
            data.weight,
            data.instructor,
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT members.*, instructors.name AS instructor_name 
            FROM members
            LEFT JOIN instructors ON (members.id_instructor = instructors.id) 
            WHERE members.id = $1
        `, [id], (error, results) => {
                if (error) throw `DATABASE erro! ${ error }`

                // console.log(results.rows[0])

                callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                email=($5),
                blood_type=($6),
                weight=($7),
                height=($8),
                id_instructor=($9)
            WHERE id = $10
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).ISO,
            data.gender,
            data.email,
            data.blood_type,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE error! ${ error }`
            
            callback(results.rows)
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            callback()
        })
    },
    instructorsOptions(callback) {
        db.query(`
            SELECT name, id
            FROM instructors
        `, (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = ``,
            totalQuery = `(
                SELECT COUNT(*) FROM members
            ) AS total`

        if (filter) {
            filterQuery = `${query} 
                WHERE members.name ILIKE '%${ filter }%'
                OR members.email ILIKE '%${ filter }%'
            `

            totalQuery = `(
                SELECT COUNT(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT members.*, ${ totalQuery } 
            FROM members
            ${ filterQuery }
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            // console.log(results.rows)

            callback(results.rows)
        })
    }
}