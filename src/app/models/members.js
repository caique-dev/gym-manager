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
                weight
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )
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
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE erro! ${ error }`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * 
            FROM members 
            WHERE id = $1`, [id], (error, results) => {
                if (error) throw `DATABASE erro! ${ error }`

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
                height=($8)
            WHERE id = $9
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
            data.id
        ]

        db.query(query, values, (error, results) => {
            if (error) throw `DATABASE error! ${ error }`
            
            callback()
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (error, results) => {
            if (error) throw `DATABASE error! ${ error }`

            callback()
        })
    }
}