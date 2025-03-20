import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/context/authContext'
const RequiresAuth = ({ children }) => {
  const {
    userDetail: { token },
  } = useAuth()
  const location = useLocation()

  return token ? (
    children
  ) : (
    <Navigate to="/login-page" state={{ from: location }} replace />
  )
}

export { RequiresAuth }
