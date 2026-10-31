import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let isAuthenticated = false;

  try {
    const authData = JSON.parse(storedUser);

    isAuthenticated =
      typeof authData.token === "string" && authData.token.length > 0;
  } catch {
    localStorage.removeItem("user");
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
