import authRouter from './routes/auth'
import userRouter from './routes/user'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
  console.log('Server running on localhost:' + process.env.PORT)
})

mongoose.connect(
  'mongodb://glcadmin:glcpassword@127.0.0.1:27017/glctulsa',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log('connected to db')
  }
)
