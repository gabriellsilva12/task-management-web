import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default App;
