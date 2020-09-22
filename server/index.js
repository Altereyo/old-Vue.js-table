let express = require('express')
let fs = require('fs')

let server = express()

server.use(express.json())

// GET
server.get('/small-table', (req, res) => {
    fs.readFile('./server/db/small-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

server.get('/big-table', (req, res) => {
    fs.readFile('./server/db/big-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

// POST
server.post('/small-table', (req, res) => {
    fs.readFile('./server/db/small-table.json', 'utf-8', (err, data) => {
        if (!err) {
            let arr = JSON.parse(data)
            let item = req.body
            arr.push(item)
            fs.writeFile('./server/db/small-table.json', JSON.stringify(arr, null, ' '), err => {
                if (!err) {
                    res.json()
                }
                else {
                    res.sendStatus(500)
                }
            })
        }
    })
})

server.post('/big-table', (req, res) => {
    fs.readFile('./server/db/big-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})


server.listen(3000, () => {
    console.log('Server runs at 3000')
})