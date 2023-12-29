import { createContext, useState } from 'react'

const AuthContext = createContext({})

const dummyUser = {
  username: 'admin@gmail.com',
  password: 'admin123'
}


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  const login = (username, password) => {
    if (username === dummyUser.username && password === dummyUser.password) {
      setAuth({ user: username })
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
