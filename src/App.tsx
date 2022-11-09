import styled from 'styled-components'

import Task from './components/Task/Task'
import type {ITask} from './typings'
import React from 'react'


const TasksMock = require('./mock/tasks').default
const AppWrapper = styled.div`
  width: 90%;
  margin: 0 auto
`

const App = () => {
  return (
    <AppWrapper>
      {
        TasksMock.map((task: ITask) => {
          return <Task key={task.id} task={task}/>
        })
      }
    </AppWrapper>
  )
}

export default App
