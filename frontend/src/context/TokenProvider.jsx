'use client'
import { createContext, useEffect, useState } from "react"

export const TokenContext = createContext()

export default function TokenProvider({ children }) {
  const [token, setToken] = useState('')
  useEffect(() => {
    const token = global.localStorage.getItem('token')
    setToken(token)
  }, [])
  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  )
}
