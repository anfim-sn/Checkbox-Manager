import React from 'react'
import {createContext, FC, useContext} from 'react'
import {ApiService} from '../services/ApiService'

interface IServicesContext {
  apiService: typeof ApiService
}

const ServicesContext = createContext<IServicesContext>(null!)
const useServices = () => useContext(ServicesContext)

export const useApiService = () => useServices().apiService

export const ServicesContextProvider: FC<{
  value: IServicesContext;
  children?: React.ReactNode;
}> = ({value, children}) => {
  // const [contextValue, setContextValue] = useState<ITask[] | null>()
  //
  // const fetchTasksByUserId = async (userId: number) => {
  //   const tasks: ITask[] | null = ServicesContext.getTaskByUserId(userId)
  //   setContextValue(tasks)
  // }
  // const createTask = async ({text, userId}: CreateBody) => {
  //   const newTask: ITask | null = ServicesContext.createTask({
  //     text,
  //     userId
  //   })
  //   // @ts-ignore
  //   setContextValue(current => [...current, newTask])
  // }
  // const updateTask = async ({id, text}) => {
  //   // @ts-ignore
  //   const newTask: ITask | null = ServicesContext.updateTask({id, text})
  //   setContextValue(current => current?.map(task => {
  //     if (task.id === newTask?.id) {
  //       return {...task, text: newTask?.text}
  //     }
  //     return task
  //   }))
  // }
  //
  // const deleteTask = async (id: number) => {
  //   const doesntExist = contextValue?.find(task => task.id === id)
  //   if (!doesntExist) return
  //   if (id != null) {await ServicesContext.deleteTask(id)}
  //   setContextValue(current => current?.filter(task => {return task.id !== id}))
  // }

  return (
    <ServicesContext.Provider
      value={value}>
      {children}
    </ServicesContext.Provider>

  )
}


