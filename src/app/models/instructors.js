const { query } = require('../../config/db')
const db = require('../../config/db')
const { date } = require('../../lib/utilitarios')

module.exports = {
    all(callback) {
        db.query(`
            SELECT instructors.*, count(members) AS total_members
            FROM instructors
            LEFT JOIN members ON (members.id_instructor = instructors.id)
            GROUP BY instructors.id
            ORDER BY id ASC
        `, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            console.log(results.rows)

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6 )
            RETURNING id
        `
        
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).ISO,
            date(Date.now()).ISO
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * 
            FROM instructors 
            WHERE id = $1`, [id], (error, results) => {
                if (error) throw `DATABASE erro! ${ error }`

                callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
            SELECT instructors.*, count(members) AS total_members
            FROM instructors
            LEFT JOIN members ON (members.id_instructor = instructors.id)
            WHERE instructors.name ILIKE '%${ filter }%'
            GROUP BY instructors.id
            ORDER BY id ASC
        `, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                services=($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).ISO,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`
            
            callback()
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = ``,
            totalQuery = `(
                SELECT COUNT(*) FROM instructors
            ) AS total`

        if (filter) {
            filterQuery = `${query} 
                WHERE instructors.name ILIKE '%${ filter }%'
                OR instructors.services ILIKE '%${ filter }%'
            `

            totalQuery = `(
                SELECT COUNT(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT instructors.*, ${ totalQuery }, COUNT(members.id_instructor) AS total_students 
            FROM instructors
            LEFT JOIN members ON instructors.id = members.id_instructor
            ${ filterQuery }
            GROUP BY instructors.id
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            console.log(results.rows)

            callback(results.rows)
        })
    }
}