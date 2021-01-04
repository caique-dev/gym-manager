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
    sobreNome: 'Andrade'
}

const teste = obj

obj.nome = 'tontao'

console.log(teste) // { nome: 'Carlão', sobreNome: 'Andrade' }