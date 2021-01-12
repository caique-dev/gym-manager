module.exports = {
    age(_timestemp) {
        const today = new Date()
        const birthDate = new Date(_timestemp)
        const monthDifference = today.getMonth() - birthDate.getMonth()
    
        let age = today.getFullYear() - birthDate.getFullYear()
    
        if (monthDifference < 0 || monthDifference == 0 && today.getDate() < birthDate.getDate()) {
            age -= 1
        }
    
        return age
    },
    date(_timestemp) {
        const date = new Date(_timestemp)
        const day = `0${date.getUTCDate()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const year = date.getUTCFullYear()

        return {
            format: `${day}/${month}/${year}`,
            ISO: `${year}-${month}-${day}`,
            birth: `${day}/${month}`
        }
    },
    blood_type(blood_type) {
        switch (blood_type) {
            case 'A1':
                return 'A+'
                break;

            case 'A0':
                return 'A-'
                break;
                
            case 'AB1':
                return 'AB+'
                break;
                
            case 'AB0':
                return 'AB-'
                break;
                
            case 'O1':
                return 'O+'
                break;
                
            case 'O0':
                return 'O-'
                break;

            default:
                break;
        }
    }
}