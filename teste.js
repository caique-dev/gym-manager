// const arr = [
//     "caique",
//     'Andrade',
//     17,
//     '05569-110'
// ]

// const [nome, , , CEP] = arr

// console.log(nome, CEP)


const obj = {
    nome: 'Caique',
    sobreNome: 'Andrade',
    idade: 17
}

var sobreNome, nome

var { sobreNome, ...nome } = obj

var [ indice1, ...indice2 ] = arr

console.log(sobreNome, nome) // Caique, Andrade, 17