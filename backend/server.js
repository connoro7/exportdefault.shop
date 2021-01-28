import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}
// Mounts product routers onto the API at '/api/products' address
app.use('/api/products', productRoutes)

// Mounts user routers onto the API at '/api/users' address
app.use('/api/users', userRoutes)

// Mounts order routers onto the API at '/api/orders' address
app.use('/api/orders', orderRoutes)

// Mounts upload routers onto the API at '/api/upload' address
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (request, response) => response.send(process.env.PAYPAL_CLIENT_ID))

// Hack to make __dirname accessible to ES Modules
const __dirname = path.resolve()
// Make /uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

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
