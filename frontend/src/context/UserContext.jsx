"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const checkUserLoggedIn = async () => { 
    try {
      const response = await axios.get("/api/v1/users/current-user", { withCredentials: true })
      setUser(response.data)
    } catch (error) {
      console.error("Not logged in", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await axios.post(
      "/api/v1/users/login",
      { email, password },
      { withCredentials: true },
    )
    setUser(response.data.user)
    return response.data
  }

  const register = async (userData) => {
    const response = await axios.post("/api/v1/users/register", userData, {
      withCredentials: true,
    })
    setUser(response.data.user)
    return response.data
  }

  const logout = async () => {
    await axios.post("/api/v1/users/logout", {}, { withCredentials: true })
    setUser(null)
  }

  return <UserContext.Provider value={{ user, loading, login, register, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

