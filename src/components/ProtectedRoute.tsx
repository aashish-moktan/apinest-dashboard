import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  children: React.ReactNode;
}

const ProtectedRoute = ({
  isAuthenticated,
  setAuthenticated,
  children,
}: ProtectedRouteProps) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const { value: token } = useLocalStorage("authToken", undefined);

  console.log(token);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        return;
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/verify-token`,
          {
            token,
          }
        );

        const data = response.data;

        if (data.success) {
          setUser({
            name: data.data.name,
            email: data.data.email,
            avatar: data.data.avatar,
          });
          setIsValidating(false);
          setIsValid(true);
          setAuthenticated(true);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (!token || !isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
