import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard setAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setIsAuthenticated} />}
        />
        {/* <Router path="/*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}
