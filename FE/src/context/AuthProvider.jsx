import { createContext, useState } from 'react'

const AuthContext = createContext({})

const dummyUsers = [
  { username: 'nvgd@gmail.com', password: 'password', role: 'nvgd' },
  { username: 'nvtk@gmail.com', password: 'password', role: 'nvtk' },
  { username: 'tdtk@gmail.com', password: 'password', role: 'tdtk' },
  { username: 'tdgd@gmail.com', password: 'password', role: 'tdgd' },
  { username: 'ceo@gmail.com', password: 'password', role: 'ceo' }
]

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  const login = (username, password) => {
    const user = dummyUsers.find(u => u.username === username && u.password === password)
    if (user) {
      setAuth({ user: username, role: user.role })
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
