const express = require('express')
const routes = require('./routes')

const server = express()
const port = 5000

server.use(express.static('public'))
server.use(routes)

server.set('views engine', 'ejs')

server.listen(port, () => {
    console.log(`Servidor ligado. Pode ser acessado em http://localhost:${port}`)
    console.log('Para desligar o servidor, tecle "ctrl + c" no terminal')
})