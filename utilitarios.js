module.exports = {
    age: (timestemp) => {
        const today = new Date()
        const birthDate = new Date(timestemp)
        const monthDifference = today.getMonth() - birthDate.getMonth()
    
        let age = today.getFullYear() - birthDate.getFullYear()
    
        if (monthDifference < 0 || monthDifference == 0 && today.getDate() < birthDate.getDate()) {
            age -= 1
        }
    
        return age
    },
    date: (timestemp, input) => {
        const date = new Date(timestemp)
        const day = `0${date.getUTCDate()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const year = date.getUTCFullYear()

        if (input) return `${year}-${month}-${day}`

        return `${day}/${month}/${year}`
    }
}