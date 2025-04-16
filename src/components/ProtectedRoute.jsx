import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  }

  <Navigate to="/login" replace />;
};

export default ProtectedRoute;