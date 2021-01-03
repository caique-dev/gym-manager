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
    date: (timestemp) => {
        const data = new Date(timestemp)
        const dia = `0${data.getDate()}`.slice(-2)
        const mes = `0${data.getMonth() + 1}`.slice(-2)
        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }
}