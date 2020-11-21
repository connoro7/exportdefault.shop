import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (request, response) => {
  response.send('API running :)')
})

// Get all products as JSON
app.get('/api/products', (request, response) => {
  response.json(products)
})

// Get single product as JSON
app.get('/api/products/:id', (request, response) => {
  const product = products.find((p) => p._id === request.params.id)
  response.json(product)
})

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
