import React, {useEffect, useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import './common/scss/common.scss'
import {Task} from './components/Task/Task'
import {Header} from './components/Header/Header'
import {TaskApi} from './services/TaskApi'
import {ITask} from './typings'

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`
const AppWrapper = styled.div`
  width: 70%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`

const taskApi = new TaskApi()

export const App = () => {
  const [tasks, setTasks] = useState<ITask[] | null>()

  const fetchTasks = async () => {
    const tasks: ITask[] | null = await taskApi.findByUserId(1)
    console.log(tasks)
    setTasks(tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <GlobalStyled/>
      <Header/>
      <AppWrapper>
        {tasks?.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}
      </AppWrapper>
    </>
  )
}
