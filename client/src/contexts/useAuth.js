import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useState
} from 'react'
import { TOKEN_NAME } from '@environments'

const AuthContext = createContext()

function AuthValue() {
  // const { onPost: loginUser }
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem(TOKEN_NAME))

  const login = useCallback(async () => {
    // handle login
    setIsAuth(!!localStorage.getItem(TOKEN_NAME))
  })

  const register = useCallback(async () => {
    // handle register
  })

  const logout = useCallback( async () => {
    localStorage.removeItem(TOKEN_NAME)
    setIsAuth(false)
  })

  useEffect(() => { }, [])
  return {
    isAuth,
    login,
    logout,
    register
  }
}

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={AuthValue()}>{children}</AuthContext.Provider>
  )
}
