import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
