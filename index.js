const http = require('http')
const url = require('url')

const PORT = 3000

const minNumber = 1
const maxNumber = 1000

const data = {}

function getRandomInt() {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
}

const generate = (res) => {
    const num = getRandomInt()
    const id = Math.random().toString(16).substring(2)
    data[id] = num

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ id }))
}

const retrieve = (res, id) => {
    const num = data[id]

    if (num) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ id, num }))
    } else {
        res.writeHead(204, { 'Content-Type': 'application/json' })
        res.end()
    }
}

const server = http.createServer((req, res) => {
    const { path } = url.parse(req.url)

    if (req.method === 'GET' && path === '/generate') {
        generate(res)
    } else if (req.method === 'GET' && path.startsWith('/retrieve')) {
        const id = path.split('/')[2]
        retrieve(res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'you can only use /generate and /retrieve' }))
    }
})

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})