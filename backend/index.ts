import express from 'express'
import {taskRouter} from './src/tasks/tasks.js'

const app = express()
const port = 9001

const jsonParserMiddleware = express.json()
app.use(jsonParserMiddleware)

app.use('/task', taskRouter)

app.listen(port, () => {
  console.log(`server start on port ${port}`)
})
