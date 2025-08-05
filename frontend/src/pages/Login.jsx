"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { toast } from "react-toastify"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      toast.success("Login successful")
      navigate("/profile")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

