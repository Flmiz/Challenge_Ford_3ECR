import { autenticarCliente, finalizarCompra, cadastrarCliente } from './modules/db_handler.mjs';
import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
});

app.post('/validacao', (req, res) => {
  autenticarCliente(req.body, function (response) {
    res.json(response)
  })
})

app.post('/compra', (req, res) => {
  finalizarCompra(req.body, function (response) {
    console.log(response)
    res.json(response)
  })
})

app.post('/cadastro', (req, res) => {
  cadastrarCliente(req.body, function (response) {
    res.json(response)
  })
})

const port = 8080

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
