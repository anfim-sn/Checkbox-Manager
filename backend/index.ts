import express from 'express'
import { taskRouter } from './src/tasks/tasks.js'
import { userRouter } from './src/users/user.js'
import cors from 'cors'

const app = express()
const port = 9001

const jsonParserMiddleware = express.json()
app.use(jsonParserMiddleware)
app.use(cors())

app.use('/task', taskRouter)
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`server start on port ${port}`)
})
