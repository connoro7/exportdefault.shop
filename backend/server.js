import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// Mounts product routers onto the API at '/api/products' address
app.use('/api/products', productRoutes)

// Mounts user routers onto the API at '/api/users' address
app.use('/api/users', userRoutes)

// Mounts order routers onto the API at '/api/orders' address
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (request, response) => response.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.get('/', (request, response) => {
  response.send('API running :)')
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/../', 'build', 'index.html'))
})

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
