import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import fs from 'fs'

const app = express()
const port = 3001

const clients = new Set()
const data = fs.readFileSync('./data/data.json')
const names = fs.readFileSync('./data/names.json')

let rateValue = 20
const { goods } = JSON.parse(data)
const productCategories = JSON.parse(names)

app.get('/goods', (_, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(parseGoods())
})

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  clients.add(ws)
  ws.send(rateValue)
  console.log('Клиент успешно подключился')
})

server.listen(port, () => {
  console.log(`Application is running`)
})

function parseGoods() {
  return goods.map(({ C, G, T, P }) => {
    const productName = getProductName(T, G)

    return {
      costInUSD: C,
      groupId: G,
      productId: T,
      productName,
      quantity: P,
      cost: C * rateValue
    }
  })
}

function getProductName(productId, groupId) {
  let products = null

  for (const key in productCategories) {
    if (+key === groupId) {
      products = productCategories[key].B
      break
    }
  }

  const findedProductId = Object.keys(products).find((id) => +id === productId)

  return products[findedProductId].N
}

setInterval(() => {
  rateValue = Math.floor(Math.random() * (80 - 20 + 1) + 20)
  clients.forEach((client) => client.send(rateValue))
}, 1000 * 15)
