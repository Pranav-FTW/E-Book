import { useUser } from "../context/UserContext"
import { Navigate } from "react-router-dom"

const Profile = () => {
  const { user, loading } = useUser()

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">Profile</h2>
      <div className="bg-white shadow-md rounded p-6">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}

export default Profile

