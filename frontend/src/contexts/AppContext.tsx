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
  return (
    <ServicesContext.Provider
      value={value}>
      {children}
    </ServicesContext.Provider>
  )
}


