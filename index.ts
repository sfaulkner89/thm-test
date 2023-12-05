import express, { NextFunction, Request, Response } from 'express'
import Tasks from './schema/tasks'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import { populate } from './mockdata/populate-db'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000']

const corsOptions = {
  credentials: true,
  origin: (
    origin: string,
    callback: (err: Error | null, data?: boolean) => void
  ) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed by CORS'))
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log('token: ' + token)
  if (!token) {
    res.status(401).send('No token provided')
  } else {
    jwt.verify(token, 'secret', (err: any, decoded: any) => {
      if (err) {
        res.status(401).send('Invalid token')
      } else {
        console.log('verified')
        // req.username = decoded.username
        next()
      }
    })
  }
}

app.use(cors(corsOptions))

app.post('/login', (req, res) => {
  const { username, password } = req.body.auth
  const payload = { username, password }
  const secret = 'secret'
  const options = { expiresIn: '1h' }
  const token = jwt.sign(payload, secret, options)
  res.send({ token })
})

app.get('/get-tasks', auth, async (req, res) => {
  console.log('get-tasks')
  const tasks = await Tasks.find()
  res.send(tasks)
})

app.post('/post-task', auth, async (req, res) => {
  const { task } = req.body
  console.log(task)
  await Tasks.create(task)
  res.send('Task created')
})

app.put('/put-task', auth, async (req, res) => {
  console.log('put-task')
  const { task } = req.body
  const { _id } = task
  await Tasks.findByIdAndUpdate(_id, task)
  res.send('Task updated')
})

app.delete('/delete-task/:id', auth, async (req, res) => {
  const { id } = req.params

  await Tasks.findByIdAndDelete(id)
  res.send('Task deleted')
})

const { NODE_ENV } = process.env

console.log('NODE_ENV: ' + NODE_ENV)

const url =
  NODE_ENV === 'dev' ? 'mongodb://localhost:27017' : 'mongodb://mongodb:27017'

console.log('Connecting to MongoDB at ' + url)

mongoose.connect(url)

populate()

app.listen(4000, () => console.log('Server is running on port 4000'))
