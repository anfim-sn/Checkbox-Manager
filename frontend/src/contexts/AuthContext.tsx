import React, { useState } from 'react'
import { createContext, FC, useContext } from 'react'

interface IAuthContext {
  isAdmin: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContext>(null!)
const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => useAuthContext()

export const AuthProvider: FC<{
  value?: Omit<IAuthContext, 'setIsAdmin'>
  children?: React.ReactNode
}> = ({
  value = {
    isAdmin: false,
  },
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState(value?.isAdmin)

  return (
    <AuthContext.Provider
      value={{
        ...value,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


