const db = require('../../config/db')
const { date } = require('../../lib/utilitarios')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM instructors', (error, results) => {
            if (error) return res.send('DATABASE error!')

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
            RETURNING id, name
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
            if (error) return res.send('DATABASE error!')

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * 
            FROM instructors 
            WHERE id = $1`, [id], (error, results) => {
                if (error) return res.send('DATABASE error!')

                callback(results.rows[0])
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
            if (error) return res.send('DATABASE error!')
            
            callback()
        })

    }
}