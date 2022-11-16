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
  const userId: number = 1
  const [tasks, setTasks] = useState<ITask[] | null>()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const tasks: ITask[] | null = await taskApi.findByUserId(userId)
    setTasks(tasks)
  }
  const createTask = async () => {
    const newTask: ITask | null = await taskApi.create({
      text: 'new task. from. front',
      userId
    })
    // @ts-ignore
    setTasks(current => [...current, newTask])
  }
  const updateTask = async () => {
    // @ts-ignore
    const newTask: ITask | null = await taskApi.update(tasks?.at(-1).id, 'Updated task')
    setTasks(current => current?.map(task => {
      if (task.id === newTask?.id) {
        return {...task, text: newTask?.text}
      }
      return task
    }))
  }
  const deleteTask = async () => {
    // @ts-ignore
    const id = tasks?.at(-1).id
    const doesntExist = tasks?.find(task => task.id === id)
    if (!doesntExist) return
    if (id != null) {await taskApi.delete(id)}
    setTasks(current => current?.filter(task => {return task.id !== id}))
  }

  return (
    <>
      <GlobalStyled/>
      <Header/>
      <button onClick={createTask}>create</button>
      <button onClick={updateTask}>update</button>
      <button onClick={deleteTask}>delete</button>
      <AppWrapper>
        {tasks?.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}
      </AppWrapper>
    </>
  )
}
