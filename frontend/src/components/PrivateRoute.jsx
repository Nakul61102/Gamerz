import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Or a spinner/loading screen

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
