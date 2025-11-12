import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContextProvider } from "./providers/UserProvider";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
            <Route
              path="/"
              element={<Login setAuthenticated={setIsAuthenticated} />}
            />
            {/* <Router path="/*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </UserContextProvider>
  );
}
